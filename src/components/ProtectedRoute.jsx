import {useContext} from "react";
import { Navigate } from "react-router-dom";

import { AuthContext } from "../context/AuthContext";

const ProtectedRoute = ({children}) => {
    const {token, isLoggedIn} = useContext(AuthContext);

    if (token === null ) {
        return <Navigate to='/login'/>
    }

    return children;
};

export default ProtectedRoute;