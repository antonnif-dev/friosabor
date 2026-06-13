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
        `rounded-lg px-3 py-2 text-sm md:text-lg font-medium transition-colors ${location.pathname === path
            ? "bg-blue-600 text-white"
            : "text-slate-600 hover:bg-slate-100 hover:text-slate-900"
        }`;

    return (
        <header className="sticky top-0 z-50 border-b border-slate-200 bg-white/90 backdrop-blur">

            <nav className="flex items-center justify-between px-4 py-4 sm:px-6 lg:px-8">

                <div className="flex items-center gap-2">
                    <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-blue-600 font-bold text-white">
                        D
                    </div>

                    <span className="text-lg md:text-4xl font-bold text-slate-900">
                        Frio Sabor
                    </span>
                </div>

                <div className="flex flex-wrap gap-2 md:gap-5">
                    <Link to="/home" className={linkClass("/home")} >Início</Link>
                    <Link to="/menu" className={linkClass("/menu")} >Cardápio</Link>
                    <ProtectedNavLink to="/cart" className={linkClass("/cart")}>Carrinho</ProtectedNavLink>
                    <ProtectedNavLink to="/orders" className={linkClass("/orders")} >
                        Pedidos
                    </ProtectedNavLink>
                    <ProtectedNavLink to="/suggestions" className={linkClass("/suggestions")} >
                        Sugestões
                    </ProtectedNavLink>
                    <ProtectedNavLink to="/reviews" className={linkClass("/reviews")} >
                        Avaliações
                    </ProtectedNavLink>
                    {
                        user && (

                            <Link
                                to="/profile"
                                className="
                flex
                items-center
                justify-center
            "
                            >

                                {
                                    user?.foto_perfil ? (

                                        <img
                                            src={user.foto_perfil}
                                            alt={user.nome}
                                            className="
                            h-10
                            w-10
                            rounded-full
                            object-cover
                            border
                            border-slate-300
                            hover:border-blue-600
                            transition
                        "
                                        />

                                    ) : (

                                        <div
                                            className="
                            flex
                            h-10
                            w-10
                            items-center
                            justify-center
                            rounded-full
                            bg-blue-600
                            font-bold
                            text-white
                        "
                                        >
                                            {
                                                user?.nome
                                                    ?.charAt(0)
                                                    ?.toUpperCase()
                                            }
                                        </div>

                                    )
                                }

                            </Link>

                        )
                    }

                    {user?.role === "admin" && (
                        <Link to="/admin/products" className={linkClass("/admin/products")} >Adcionar Produtos</Link>
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