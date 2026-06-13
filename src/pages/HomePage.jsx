import { useEffect, useState, useContext } from "react";
import { api } from "../services/api";
import { CartContext } from "../contexts/CartContext";
import { Link } from "react-router-dom";

function HomePage() {

    const [produtos, setProdutos] = useState([]);
    const [loading, setLoading] = useState(true);
    const { addItem } = useContext(CartContext);
    const [hallFama, setHallFama] = useState([]);

    useEffect(() => {

        carregar();

    }, []);

    async function carregar() {

        try {

            const [
                produtosRes,
                hallRes
            ] = await Promise.all([
                api.get("/produtos"),
                api.get("/sugestoes/hall-fama")
            ]);

            setProdutos(
                produtosRes.data
            );

            setHallFama(
                hallRes.data
            );

        } catch (error) {

            console.error(error);

        } finally {

            setLoading(false);
        }
    }

    if (loading) {

        return (
            <div className="py-20 text-center">
                Carregando...
            </div>
        );
    }

    const destaque =
        produtos.slice(0, 4);

    return (

        <div className="space-y-20">

            {/* Hero */}
            <section
                className="
                    overflow-hidden
                    rounded-3xl
                    bg-gradient-to-r
                    from-blue-600
                    to-blue-700
                    px-8
                    py-16
                    text-white
                "
            >

                <div>

                    <h1 className="text-4xl font-bold md:text-6xl">
                        Marmitas frescas entregues na sua casa
                    </h1>

                    <p
                        className="
                            mt-6
                            text-lg
                            text-blue-100
                        "
                    >
                        Alimentação saudável,
                        saborosa e pronta para
                        facilitar seu dia.
                    </p>

                    <div className="mt-8 flex gap-4">

                        <Link
                            to="/menu"
                            className="
                                rounded-xl
                                bg-white
                                px-6
                                py-3
                                font-semibold
                                text-blue-600
                            "
                        >
                            Ver Cardápio
                        </Link>

                        <Link
                            to="/orders"
                            className="
                                rounded-xl
                                border
                                border-white
                                px-6
                                py-3
                                font-semibold
                            "
                        >
                            Meus Pedidos
                        </Link>

                    </div>

                </div>

            </section>

            {/* Benefícios */}
            <section>

                <h2
                    className="
                        mb-8
                        text-center
                        text-3xl
                        font-bold
                    "
                >
                    Por que escolher nossas marmitas?
                </h2>

                <div
                    className="
                        grid
                        gap-6
                        md:grid-cols-3
                    "
                >

                    <div
                        className="
                            rounded-2xl
                            bg-white
                            p-6
                            shadow-sm
                        "
                    >
                        <h3 className="font-bold">
                            🥗 Ingredientes Frescos
                        </h3>

                        <p className="mt-2 text-slate-600">
                            Refeições preparadas
                            diariamente.
                        </p>
                    </div>

                    <div
                        className="
                            rounded-2xl
                            bg-white
                            p-6
                            shadow-sm
                        "
                    >
                        <h3 className="font-bold">
                            🚚 Entrega Rápida
                        </h3>

                        <p className="mt-2 text-slate-600">
                            Receba sem sair de casa.
                        </p>
                    </div>

                    <div
                        className="
                            rounded-2xl
                            bg-white
                            p-6
                            shadow-sm
                        "
                    >
                        <h3 className="font-bold">
                            🍽️ Cardápio Variado
                        </h3>

                        <p className="mt-2 text-slate-600">
                            Opções para todos os gostos.
                        </p>
                    </div>

                </div>



            </section>

            {/* hall da fama */}
            {hallFama.length > 0 && (
                <section className="mt-12">

                    <h2
                        className="
            mb-6
            text-3xl
            font-bold
            text-slate-900
        "
                    >
                        Hall da Fama
                    </h2>

                    <p
                        className="
            mb-8
            text-slate-600
        "
                    >
                        Clientes que tiveram ideias
                        transformadas em pratos reais.
                    </p>

                    <div
                        className="
            grid
            gap-6
            md:grid-cols-2
        "
                    >

                        {hallFama.map(item => (

                            <div
                                key={item.id}
                                className="
                    rounded-2xl
                    border
                    border-yellow-200
                    bg-yellow-50
                    p-6
                    shadow-sm
                "
                            >

                                <div
                                    className="
                        mb-4
                        text-4xl
                    "
                                >
                                    🏆
                                </div>

                                <h3
                                    className="
                        text-xl
                        font-bold
                    "
                                >
                                    {item.cliente_nome}
                                </h3>

                                <p
                                    className="
                        mt-3
                        text-lg
                        font-semibold
                        text-green-700
                    "
                                >
                                    {item.prato}
                                </p>

                                <p
                                    className="
                        mt-3
                        text-slate-700
                    "
                                >
                                    {item.descricao}
                                </p>

                                <p
                                    className="
                        mt-4
                        text-sm
                        text-slate-500
                    "
                                >
                                    Lançado em {
                                        item.data_lancamento
                                            ?.split("-")
                                            .reverse()
                                            .join("/")
                                    }
                                </p>

                            </div>

                        ))}

                    </div>

                    <div className="mt-8 text-center">

                        <Link
                            to="/sugestoes"
                            className="
            inline-flex
            rounded-xl
            bg-yellow-500
            px-6
            py-3
            font-semibold
            text-white
            hover:bg-yellow-600
            transition
        "
                        >
                            Enviar minha ideia
                        </Link>

                    </div>

                </section>
            )}

            {/* Como funciona */}
            <section
                className="
                    rounded-3xl
                    bg-white
                    p-10
                    shadow-sm
                "
            >

                <h2
                    className="
                        mb-8
                        text-center
                        text-3xl
                        font-bold
                    "
                >
                    Como funciona
                </h2>

                <div
                    className="
                        grid
                        gap-8
                        md:grid-cols-3
                    "
                >

                    <div className="text-center">
                        <div className="text-5xl">
                            1️⃣
                        </div>

                        <h3 className="mt-4 font-bold">
                            Escolha
                        </h3>

                        <p className="mt-2 text-slate-600">
                            Navegue pelo cardápio.
                        </p>
                    </div>

                    <div className="text-center">
                        <div className="text-5xl">
                            2️⃣
                        </div>

                        <h3 className="mt-4 font-bold">
                            Faça o pedido
                        </h3>

                        <p className="mt-2 text-slate-600">
                            Adicione ao carrinho.
                        </p>
                    </div>

                    <div className="text-center">
                        <div className="text-5xl">
                            3️⃣
                        </div>

                        <h3 className="mt-4 font-bold">
                            Receba
                        </h3>

                        <p className="mt-2 text-slate-600">
                            Entregamos onde você estiver.
                        </p>
                    </div>

                </div>

            </section>

        </div>
    );
}

export default HomePage;