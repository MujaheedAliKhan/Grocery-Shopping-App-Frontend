import { createContext, useEffect, useState } from "react";
import { getCurrentUserApi } from "../api/authApi";

export const AuthContext = createContext();

const AuthProvider = ({ children }) => {

   const [token, setToken] = useState(
      localStorage.getItem("token") || null
   );

   const [isLoggedIn, setIsLoggedIn] = useState(false);
   const [role, setRole] = useState(
    localStorage.getItem("role") || null
   );

   const [user, setUser] = useState(null);

   useEffect(() => {

      const fetchCurrentUser = async () => {
         
        try {
          if (token) {
            const data = await getCurrentUserApi(token);
            setUser(data);
            setRole(data.role);
            setIsLoggedIn(true);
   
         } else {
            setUser(null);
            setIsLoggedIn(false);
         }
        } catch (error) {
            console.log(error);
            setUser(null);
            setIsLoggedIn(false);
        }
      }
      fetchCurrentUser();

   }, [token]);

   // LOGIN
   const login = (newToken, userRole) => {

      localStorage.setItem("token", newToken);
      localStorage.setItem("role", userRole);

      setToken(newToken);

      setRole(userRole);

      setIsLoggedIn(true);
   };

   // LOGOUT
   const logout = () => {

      localStorage.removeItem("token");
      localStorage.removeItem("role");

      setToken(null);

      setRole(null);

      setIsLoggedIn(false);
   };

   return (
      <AuthContext.Provider
         value={{
            token,
            role,
            isLoggedIn,
            login,
            logout,
            user
         }}
      >
         {children}
      </AuthContext.Provider>
   );
};

export default AuthProvider;