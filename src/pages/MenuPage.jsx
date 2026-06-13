import { useEffect, useState, useContext } from "react";
import { api } from "../services/api";
import { CartContext } from "../contexts/CartContext";

function MenuPage() {
    const [produtos, setProdutos] = useState([]);
    const [loading, setLoading] = useState(true);

    const { addItem } = useContext(CartContext);

    const [produtoSelecionado, setProdutoSelecionado] = useState(null);
    const [modalAberto, setModalAberto] = useState(false);

    const [abaAtiva, setAbaAtiva] = useState("combos");
    const categorias = ["combos", "marmitas", "sobremesas", "bebidas"];
    const combos = produtos.filter(p => p.categoria === "combos");
    const marmitas = produtos.filter(p => p.categoria === "marmitas");
    const sobremesas = produtos.filter(p => p.categoria === "sobremesas");
    const bebidas = produtos.filter(p => p.categoria === "bebidas");

    useEffect(() => {
        async function carregar() {
            try {
                const response = await api.get("/produtos");
                setProdutos(response.data);
            } catch (error) {
                console.error(error);
            } finally {
                setLoading(false);
            }
        }

        carregar();
    }, []);

    if (loading) {
        return (
            <div className="flex justify-center py-20">
                <span className="text-lg text-slate-600">
                    Carregando cardápio...
                </span>
            </div>
        );
    }

    const categoriasMap = {
        combos: "2762f232-2741-4fc4-9ba8-75009737993a",
        marmitas: "08f7f6b8-938a-4e05-8f64-6a5e7f5a63da",
        bebidas: "3c39d2ac-7133-4ff0-8cc8-0a9ce76b5db6",
        sobremesas: "be22ce49-6739-4df8-b2aa-5e31a7a28bf2",
    };

    const produtosFiltrados = produtos.filter(
        (produto) =>
            produto.categoria_id === categoriasMap[abaAtiva]
    );
    
    function abrirModal(produto) {
        setProdutoSelecionado(produto);
        setModalAberto(true);
    }

    function fecharModal() {
        setProdutoSelecionado(null);
        setModalAberto(false);
    }

    return (
        <div className="space-y-8">
            <div className="rounded-2xl bg-gradient-to-r from-blue-600 to-blue-400 p-10 text-white">
                <h1 className="text-4xl font-bold">
                    Marmitas caseiras feitas para o seu dia a dia
                </h1>

                <p className="mt-3 text-white/90">
                    Comida fresca, saudável e entregue onde você estiver.
                </p>
            </div>

            <div>
                <p className="mt-2 text-slate-600">
                    Escolha seus produtos favoritos.
                </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-center text-slate-600">
                <div>
                    ⏱ Entrega rápida
                </div>
                <div>
                    🍲 Comida caseira
                </div>
                <div>
                    💳 Pagamento fácil
                </div>
            </div>

            <div className="flex w-full gap-2 flex-wrap mb-6">
                <button
                    onClick={() => setAbaAtiva("combos")}
                    className={`w-50 py-2 rounded-xl text-lg font-medium ${abaAtiva === "combos"
                        ? "bg-green-600 text-white"
                        : "bg-slate-200"
                        }`}
                >
                    Pode te interessar
                </button>

                <button
                    onClick={() => setAbaAtiva("marmitas")}
                    className={`w-50 py-2 rounded-xl text-lg font-medium ${abaAtiva === "marmitas"
                        ? "bg-green-600 text-white"
                        : "bg-slate-200"
                        }`}
                >
                    Marmitas
                </button>

                <button
                    onClick={() => setAbaAtiva("sobremesas")}
                    className={`w-50 py-2 rounded-xl text-lg font-medium ${abaAtiva === "sobremesas"
                        ? "bg-green-600 text-white"
                        : "bg-slate-200"
                        }`}
                >
                    Sobremesas
                </button>

                <button
                    onClick={() => setAbaAtiva("bebidas")}
                    className={`w-50 py-2 rounded-xl text-lg font-medium ${abaAtiva === "bebidas"
                        ? "bg-green-600 text-white"
                        : "bg-slate-200"
                        }`}
                >
                    Bebidas
                </button>
            </div>

            {/* Produtos */}
            <div
                className="
                    grid
                    gap-6
                    sm:grid-cols-2
                    lg:grid-cols-3
                    xl:grid-cols-4
                "
            >
                {produtosFiltrados.map((produto) => (
                    <div
                        key={produto.id}
                        onClick={() => abrirModal(produto)}
                        className="
                            cursor-pointer
                            flex
                            flex-col
                            justify-between
                            rounded-2xl
                            border
                            border-slate-200
                            bg-white
                            p-5
                            shadow-sm
                            transition
                            hover:-translate-y-1
                            hover:shadow-lg
                        "
                    >
                        <div>
                            <img
                                src={produto.imagem}
                                alt={produto.nome}
                                className="h-56 w-full object-cover rounded-xl"
                            />
                            <h3 className="text-xl font-semibold text-slate-900">
                                {produto.nome}
                            </h3>

                            <p className="mt-2 text-sm text-slate-600">
                                {produto.descricao}
                            </p>
                        </div>

                        <div className="mt-6 flex items-center justify-between">

                            <span className="text-2xl font-bold text-green-600">
                                R$ {Number(produto.preco).toFixed(2)}
                            </span>

                            <button
                                onClick={(e) => { e.stopPropagation(); addItem(produto); }}
                                className="
        rounded-xl
        bg-green-600
        px-4
        py-2
        font-medium
        text-white
        transition
        hover:bg-green-700
    "
                            >
                                Adicionar
                            </button>

                        </div>
                    </div>
                ))}
            </div>

            {modalAberto && produtoSelecionado && (
                <div
                    className="
            fixed inset-0 z-50
            flex items-center justify-center
            bg-black/50
            p-4
        "
                    onClick={fecharModal}
                >
                    <div
                        className="
                w-full max-w-lg
                rounded-2xl
                bg-white
                p-6
                shadow-xl
            "
                        onClick={(e) => e.stopPropagation()}
                    >
                        <img
                            src={produtoSelecionado.imagem}
                            alt={produtoSelecionado.nome}
                            className="h-56 w-full rounded-xl object-cover"
                        />

                        <h2 className="mt-4 text-2xl font-bold">
                            {produtoSelecionado.nome}
                        </h2>

                        <p className="mt-2 text-slate-600">
                            {produtoSelecionado.descricao}
                        </p>

                        {produtoSelecionado.opcoes?.length > 0 && (
                            <div className="mt-4 space-y-2 text-sm text-slate-700">
                                <p>
                                    <strong>Opções da marmita:</strong>
                                </p>

                                <ul className="list-disc pl-5">
                                    {produtoSelecionado.opcoes.map((opcao, index) => (
                                        <li key={index}>{opcao}</li>
                                    ))}
                                </ul>
                            </div>
                        )}

                        <div className="mt-6 flex items-center justify-between">
                            <span className="text-xl font-bold text-blue-600">
                                R$ {Number(produtoSelecionado.preco).toFixed(2)}
                            </span>

                            <button
                                onClick={() => {
                                    addItem(produtoSelecionado);
                                    fecharModal();
                                }}
                                className="
                        rounded-xl
                        bg-blue-600
                        px-4
                        py-2
                        font-medium
                        text-white
                        hover:bg-blue-700
                    "
                            >
                                Adicionar ao carrinho
                            </button>
                        </div>

                        <button
                            onClick={fecharModal}
                            className="mt-4 w-full text-sm text-slate-500 hover:text-slate-700"
                        >
                            Fechar
                        </button>
                    </div>
                </div>
            )}

        </div>
    );
}

export default MenuPage;