import { useEffect, useState } from "react";
import { api } from "../services/api";

function AdminEstoquePage() {

    const [produtos, setProdutos] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        carregarProdutos();
    }, []);

    async function carregarProdutos() {
        try {
            const response = await api.get("/produtos");

            const data = response.data.map(p => ({
                ...p,
                quantidade: p.quantidade ?? 0
            }));

            setProdutos(data);

        } catch (error) {
            console.error(error);
            alert("Erro ao carregar produtos");
        } finally {
            setLoading(false);
        }
    }

    function alterarQuantidade(id, valor) {
        setProdutos(prev =>
            prev.map(p =>
                p.id === id
                    ? { ...p, quantidade: Number(valor) }
                    : p
            )
        );
    }

    async function salvarEstoque() {
        try {

            const requests = produtos.map(p =>
                api.put(`/produtos/${p.id}`, {
                    quantidade: p.quantidade
                })
            );

            await Promise.all(requests);

            alert("Estoque atualizado com sucesso!");

        } catch (error) {
            console.error(error);
            alert("Erro ao salvar estoque");
        }
    }

    function renderCategoria(nomeCategoria) {

        const itens = produtos.filter(
            p => p.categorias?.nome === nomeCategoria
        );

        if (!itens.length) return null;

        return (
            <div className="mb-8 border rounded-xl p-6 bg-white shadow-sm">

                <h2 className="text-xl font-bold mb-4">
                    {nomeCategoria}
                </h2>

                <div className="space-y-3">

                    {itens.map(produto => (

                        <div
                            key={produto.id}
                            className="flex items-center justify-between border-b pb-2"
                        >

                            <span className="font-medium">
                                {produto.nome}
                            </span>

                            <input
                                type="number"
                                min="0"
                                value={produto.quantidade}
                                onChange={(e) =>
                                    alterarQuantidade(
                                        produto.id,
                                        e.target.value
                                    )
                                }
                                className="w-24 border rounded px-2 py-1"
                            />

                        </div>

                    ))}

                </div>
            </div>
        );
    }

    if (loading) {
        return <p className="p-6">Carregando estoque...</p>;
    }

    return (
        <div className="p-6 max-w-5xl mx-auto">

            <h1 className="text-3xl font-bold mb-6">
                Controle de Estoque
            </h1>

            {renderCategoria("Combos")}
            {renderCategoria("Marmitas")}
            {renderCategoria("Sobremesas")}
            {renderCategoria("Bebidas")}

            <button
                onClick={salvarEstoque}
                className="mt-6 bg-green-600 text-white px-6 py-3 rounded-lg hover:bg-green-700"
            >
                Salvar Estoque
            </button>

        </div>
    );
}

export default AdminEstoquePage;