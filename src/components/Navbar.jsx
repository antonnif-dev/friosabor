import { Link, useLocation, useNavigate } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../contexts/AuthContext";
import ProtectedNavLink from "./ProtectedNavLink";
//import { IoPerson } from "react-icons/io5";

function Navbar() {

    const location = useLocation();
    const navigate = useNavigate();

    const { user, logout } = useContext(AuthContext);

    function handleLogout() {

        logout();

        navigate("/menu");
    }

    const linkClass = (path) =>
        `rounded-lg px-2 py-2 text-md md:text-xl font-medium transition-colors ${location.pathname === path
            ? "bg-blue-600 text-white"
            : "text-black hover:bg-slate-100 hover:text-black"
        }`;

    return (
        <header className="fixed bottom-0 left-0 right-0 bg-gradient-to-r from-[#5170FF] via-[#5170FF] to-[#FF66C4]">

            <nav className="flex justify-center py-4">

                <div className="flex justify-center md:gap-10 flex-wrap">
                    <Link to="/home" className={linkClass("/home")} >Início</Link>
                    <Link to="/menu" className={linkClass("/menu")} >Cardápio</Link>
                    <ProtectedNavLink to="/orders" className={linkClass("/orders")} >
                        Pedidos
                    </ProtectedNavLink>
                    <ProtectedNavLink to="/suggestions" className={linkClass("/suggestions")} >
                        Sugestões
                    </ProtectedNavLink>
                    <ProtectedNavLink to="/reviews" className={linkClass("/reviews")} >
                        Avaliações
                    </ProtectedNavLink>

                    {user?.role === "admin" && (
                        <Link to="/admin/products" className={linkClass("/admin/products")} >Adcionar Produtos</Link>
                    )}

                    {user?.role === "admin" && (
                        <Link to="/admin/stock" className={linkClass("/admin/stock")} >Estoque</Link>
                    )}

                    {
                        user ? (
                            <button
                                onClick={handleLogout}
                                className="rounded-lg bg-red-600 px-3 py-2 text-sm font-medium text-white transition hover:bg-red-700"
                            >
                                Sair
                            </button>
                        ) : (

                            <Link
                                to="/login"
                                className="rounded-lg bg-blue-600 px-3 py-2 text-sm font-medium text-white transition hover:bg-blue-700"
                            >
                                Entrar
                            </Link>

                        )
                    }

                </div>
            </nav>
        </header>
    );
}

export default Navbar;