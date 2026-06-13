import { Navigate } from "react-router-dom";
import { useContext, useEffect } from "react";
import { AuthContext } from "../contexts/AuthContext";

function PrivateRoute({ children }) {

    const { user } = useContext(AuthContext);

    useEffect(() => {

        if (!user) {

            alert(
                "Você precisa estar logado."
            );
        }

    }, [user]);


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