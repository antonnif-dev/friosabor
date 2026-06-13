import { Link, useNavigate } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../contexts/AuthContext";

function ProtectedNavLink({
    to,
    className,
    children
}) {

    const { user } =
        useContext(AuthContext);

    const navigate =
        useNavigate();

    function handleClick() {

        alert(
            "Você precisa estar logado para acessar esta página."
        );

        navigate("/login");
    }

    if (user) {

        return (
            <Link
                to={to}
                className={className}
            >
                {children}
            </Link>
        );
    }

    return (
        <button
            onClick={handleClick}
            className={`
                ${className}
                opacity-50
                cursor-pointer
            `}
        >
            🔒 {children}
        </button>
    );
}

export default ProtectedNavLink;