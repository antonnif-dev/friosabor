import { useContext, useMemo } from "react";
import { Link } from "react-router-dom";
import { CartContext } from "../contexts/CartContext";
import { FaBell, FaMapMarkerAlt, FaShoppingCart } from "react-icons/fa";
import { AuthContext } from "../contexts/AuthContext";

function TopBar() {

    const { user } = useContext(AuthContext);
    const { cartCount } = useContext(CartContext);

    const greeting = useMemo(() => {

        const now = new Date();

        const brazilHour = Number(
            new Intl.DateTimeFormat("en-US", {
                hour: "numeric",
                hour12: false,
                timeZone: "America/Sao_Paulo",
            }).format(now)
        );

        if (brazilHour >= 5 && brazilHour < 12) {
            return "Bom dia";
        }

        if (brazilHour >= 12 && brazilHour < 18) {
            return "Boa tarde";
        }

        return "Boa noite";

    }, []);

    return (

        <header className="top-0 -40 bg-gray-100 md:px-10 py-3 md:py-7
                            bg-gradient-to-r from-[#FF66C4] via-[#5170FF] to-[#5170FF]">

            <div className="flex items-center justify-around md:justify-between">

                {/* Saudação */}
                <div>

                    <p className="flex justify-center text-base md:text-xl text-black font-semibold">
                        {greeting}, {user?.nome || "Guest"}
                    </p>

                    <Link
                        to="/addresses"
                        className="mt-1 flex items-center text-xs md:text-md font-semibold text-slate-900 hover:text-red-500 transition">
                        <FaMapMarkerAlt size={9} />

                        <span>
                            {user?.logradouro && user?.numero ? `${user.logradouro}, ${user.numero}` : "Choose delivery address"}
                        </span>

                    </Link>

                </div>

                {/* Nome da loja */}
                <div className="flex items-center gap-2">
                    <span className="text-xl md:text-4xl font-bold text-slate-900">
                        Frio Sabor Congelados
                    </span>
                </div>

                {/* Ações */}
                <div className="flex items-center gap-4 md:gap-8">

                    {
                        user && (

                            <Link to="/cart" className="relative flex items-center justify-center">

                                <FaShoppingCart size={24} />

                                {cartCount > 0 && (
                                    <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs w-5 h-5 flex items-center justify-center rounded-full">
                                        {cartCount}
                                    </span>
                                )}

                            </Link>

                        )
                    }

                    <button
                        className="
                            relative
                            text-black
                            hover:text-blue-600
                            transition
                        "
                    >
                        <FaBell size={22} />
                    </button>

                    {
                        user && (

                            <Link
                                to="/profile"
                                className="flex items-center justify-center">

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

                </div>

            </div>

        </header>

    );
}

export default TopBar;