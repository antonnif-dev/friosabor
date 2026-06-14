import { Navigate } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../contexts/AuthContext";

function PrivateRoute({ children }) {

    const { user, loading } = useContext(AuthContext);

    if (loading) {
        return null; // ou um loader/spinner
    }

    if (!user) {

        return (
            <Navigate
                to="/login"
                replace
            />
        );
    }

    return children;
}

export default PrivateRoute;