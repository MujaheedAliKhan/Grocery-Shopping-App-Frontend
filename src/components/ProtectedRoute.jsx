import {useContext} from "react";
import { Navigate } from "react-router-dom";

import { AuthContext } from "../context/authContext";

const ProtectedRoute = ({children}) => {
    const {token, isLoggedIn} = useContext(AuthContext);

    if (token === null ) {
        return <Navigate to='/login'/>
    }

    return children;
};

export default ProtectedRoute;