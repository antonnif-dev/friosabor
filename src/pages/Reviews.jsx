import {
    useEffect,
    useState,
    useContext
} from "react";
import { api } from "../services/api";
import { AuthContext } from "../contexts/AuthContext";
import { useNavigate } from "react-router-dom";

function Reviews() {

    const { user } = useContext(AuthContext);
    const navigate = useNavigate();

    const [categoria,
        setCategoria] =
        useState("combos");

    const [produtos,
        setProdutos] =
        useState([]);

    const [produtoId,
        setProdutoId] =
        useState("");

    const [estrelas,
        setEstrelas] =
        useState(5);

    const [avaliacoes,
        setAvaliacoes] =
        useState([]);

    useEffect(() => {

        carregarProdutos();
        carregarAvaliacoes();

    }, [categoria]);

    useEffect(() => {

        if (
            user?.role ===
            "admin"
        ) {

            carregarAvaliacoes();
        }

    }, []);

    async function carregarProdutos() {

        try {

            const response =
                await api.get(
                    "/produtos"
                );

            const filtrados =
                response.data
                    .filter(
                        produto =>
                            produto
                                .categorias
                                ?.nome
                                ?.toLowerCase()
                            === categoria
                    );

            setProdutos(
                filtrados
            );

        } catch (error) {

            console.error(error);
        }
    }

    async function carregarAvaliacoes() {

        try {

            const response =
                await api.get(
                    "/avaliacoes"
                );

            setAvaliacoes(
                response.data
            );

        } catch (error) {

            console.error(error);
        }
    }

    async function enviarAvaliacao() {

        if (!user) {

            alert(
                "Você precisa estar cadastrado e logado para realizar uma avaliação."
            );

            navigate("/login");

            return;
        }

        try {

            await api.post(
                "/avaliacoes",
                {
                    produto_id:
                        produtoId,

                    categoria,

                    estrelas
                }
            );

            alert(
                "Avaliação enviada!"
            );

            setProdutoId("");

            setEstrelas(5);

        } catch (error) {

            console.error(error);
        }
    }

    async function excluir(id) {

        try {

            await api.delete(
                `/avaliacoes/${id}`
            );

            carregarAvaliacoes();

        } catch (error) {

            console.error(error);
        }
    }

    return (

        <div className="p-6">

            <h1
                className="
                    mb-8
                    text-4xl
                    font-bold
                "
            >
                Avaliações
            </h1>

            <div
                className="
                    rounded-2xl
                    border
                    p-6
                    bg-white
                "
            >

                <div
                    className="
                        grid
                        gap-4
                        md:grid-cols-3
                    "
                >

                    <select
                        value={categoria}
                        onChange={(e) =>
                            setCategoria(
                                e.target.value
                            )
                        }
                        className="border p-3 rounded-xl"
                    >
                        <option value="combos">
                            Combos
                        </option>

                        <option value="marmitas">
                            Marmitas
                        </option>

                        <option value="bebidas">
                            Bebidas
                        </option>

                        <option value="sobremesas">
                            Sobremesas
                        </option>

                    </select>

                    <select
                        value={produtoId}
                        onChange={(e) =>
                            setProdutoId(
                                e.target.value
                            )
                        }
                        className="border p-3 rounded-xl"
                    >

                        <option value="">
                            Selecione
                        </option>

                        {produtos.map(produto => (

                            <option
                                key={produto.id}
                                value={produto.id}
                            >
                                {produto.nome}
                            </option>

                        ))}

                    </select>

                    <select
                        value={estrelas}
                        onChange={(e) =>
                            setEstrelas(
                                Number(
                                    e.target.value
                                )
                            )
                        }
                        className="border p-3 rounded-xl"
                    >

                        <option value="1">
                            ⭐
                        </option>

                        <option value="2">
                            ⭐⭐
                        </option>

                        <option value="3">
                            ⭐⭐⭐
                        </option>

                        <option value="4">
                            ⭐⭐⭐⭐
                        </option>

                        <option value="5">
                            ⭐⭐⭐⭐⭐
                        </option>

                    </select>

                </div>

                <button
                    onClick={
                        enviarAvaliacao
                    }
                    className="
                        mt-6
                        rounded-xl
                        bg-blue-600
                        px-6
                        py-3
                        text-white
                    "
                >
                    Enviar avaliação
                </button>

            </div>

            {user?.role === "admin" && (

                <div
                    className="
                        mt-10
                        rounded-2xl
                        border
                        bg-white
                        p-6
                    "
                >

                    <h2
                        className="
                            mb-6
                            text-2xl
                            font-bold
                        "
                    >
                        Avaliações Recebidas
                    </h2>

                    <div
                        className="
                            space-y-4
                        "
                    >

                        {avaliacoes.map(item => (

                            <div
                                key={item.id}
                                className="
                                    flex
                                    items-center
                                    justify-between
                                    rounded-xl
                                    border
                                    p-4
                                "
                            >

                                <div>

                                    <h3
                                        className="
                                            font-bold
                                        "
                                    >
                                        {
                                            item.produtos?.nome
                                        }
                                    </h3>

                                    <p>
                                        {
                                            item.estrelas
                                        } ⭐
                                    </p>

                                </div>

                                <button
                                    onClick={() =>
                                        excluir(
                                            item.id
                                        )
                                    }
                                    className="
                                        rounded-lg
                                        bg-red-600
                                        px-4
                                        py-2
                                        text-white
                                    "
                                >
                                    Excluir
                                </button>

                            </div>

                        ))}

                    </div>

                </div>

            )}

        </div>
    );
}

export default Reviews;