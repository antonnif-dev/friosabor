import { useState, useEffect } from "react";
import { api } from "../services/api";

function AdminProductsPage() {

    const [nome, setNome] = useState("");
    const [descricao, setDescricao] = useState("");
    const [preco, setPreco] = useState("");
    const [categorias, setCategorias] = useState([]);
    const [categoriaId, setCategoriaId] = useState("");
    const [imagem, setImagem] = useState(null);

    const [produtos, setProdutos] = useState([]);
    const [editando, setEditando] = useState(null);

    const [editNome, setEditNome] = useState("");
    const [editDescricao, setEditDescricao] = useState("");
    const [editPreco, setEditPreco] = useState("");
    const [editCategoriaId, setEditCategoriaId] = useState("");
    const [editImagem, setEditImagem] = useState(null);

    async function carregarProdutos() {

        try {

            const response =
                await api.get("/produtos");

            setProdutos(response.data);

        } catch (error) {

            console.error(error);
        }
    }

    useEffect(() => {

        async function carregar() {

            try {

                const response =
                    await api.get("/categorias");

                setCategorias(response.data);
                await carregarProdutos();

            } catch (error) {

                console.error(error);
            }
        }

        carregar();

    }, []);

    async function handleSubmit(e) {

        e.preventDefault();

        try {

            const formData =
                new FormData();

            formData.append(
                "categoria_id",
                categoriaId
            );

            formData.append(
                "nome",
                nome
            );

            formData.append(
                "descricao",
                descricao
            );

            formData.append(
                "preco",
                preco
            );

            if (imagem) {

                formData.append(
                    "imagem",
                    imagem
                );
            }

            await api.post(
                "/produtos",
                formData,
                {
                    headers: {
                        "Content-Type":
                            "multipart/form-data"
                    }
                }
            );

            alert("Produto criado!");

            setNome("");
            setDescricao("");
            setPreco("");
            setCategoriaId("");
            setImagem(null);

            await carregarProdutos();

        } catch (error) {

            console.error(error);

            alert("Erro ao cadastrar");
        }
    }

    function iniciarEdicao(produto) {

        setEditando(produto.id);

        setEditNome(produto.nome);

        setEditDescricao(
            produto.descricao
        );

        setEditPreco(produto.preco);

        setEditCategoriaId(
            produto.categoria_id
        );
    }

    async function salvarEdicao(id) {

        try {

            const formData =
                new FormData();

            formData.append(
                "nome",
                editNome
            );

            formData.append(
                "descricao",
                editDescricao
            );

            formData.append(
                "preco",
                editPreco
            );

            formData.append(
                "categoria_id",
                editCategoriaId
            );

            if (editImagem) {

                formData.append(
                    "imagem",
                    editImagem
                );
            }

            await api.put(
                `/produtos/${id}`,
                formData,
                {
                    headers: {
                        "Content-Type":
                            "multipart/form-data"
                    }
                }
            );

            setEditando(null);

            await carregarProdutos();

        } catch (error) {

            console.error(error);

            alert("Erro ao editar");
        }
    }

    async function excluirProduto(id) {

        const confirmar =
            confirm(
                "Excluir produto?"
            );

        if (!confirmar) return;

        try {

            await api.delete(
                `/produtos/${id}`
            );

            carregarProdutos();

        } catch (error) {

            console.error(error);

            alert("Erro ao excluir");
        }
    }

    return (

        <div>

            <div className="mb-8">

                <h1 className="text-4xl font-bold text-slate-900">
                    Cadastrar Produto
                </h1>

                <p className="mt-2 text-slate-600">
                    Adicione novos itens ao cardápio.
                </p>

            </div>

            <div
                className="
                    rounded-2xl
                    border
                    border-slate-200
                    bg-white
                    p-8
                    shadow-sm
                "
            >

                <form
                    onSubmit={handleSubmit}
                    className="space-y-6"
                >

                    <div>

                        <label
                            className="
                                mb-2
                                block
                                text-sm
                                font-medium
                                text-slate-700
                            "
                        >
                            Nome do Produto
                        </label>

                        <input
                            value={nome}
                            onChange={(e) =>
                                setNome(e.target.value)
                            }
                            placeholder="Ex: Hambúrguer Artesanal"
                            className="
                                w-full
                                rounded-xl
                                border
                                border-slate-300
                                px-4
                                py-3
                                outline-none
                                transition
                                focus:border-blue-500
                                focus:ring-2
                                focus:ring-blue-200
                            "
                        />

                    </div>

                    <div>

                        <label
                            className="
                                mb-2
                                block
                                text-sm
                                font-medium
                                text-slate-700
                            "
                        >
                            Descrição
                        </label>

                        <textarea
                            value={descricao}
                            onChange={(e) =>
                                setDescricao(e.target.value)
                            }
                            rows={4}
                            placeholder="Descreva o produto..."
                            className="
                                w-full
                                rounded-xl
                                border
                                border-slate-300
                                px-4
                                py-3
                                outline-none
                                transition
                                focus:border-blue-500
                                focus:ring-2
                                focus:ring-blue-200
                            "
                        />

                    </div>

                    <div className="grid gap-6 md:grid-cols-2">

                        <div>

                            <label
                                className="
                                    mb-2
                                    block
                                    text-sm
                                    font-medium
                                    text-slate-700
                                "
                            >
                                Preço
                            </label>

                            <input
                                type="number"
                                step="0.01"
                                value={preco}
                                onChange={(e) =>
                                    setPreco(e.target.value)
                                }
                                placeholder="0.00"
                                className="
                                    w-full
                                    rounded-xl
                                    border
                                    border-slate-300
                                    px-4
                                    py-3
                                    outline-none
                                    transition
                                    focus:border-blue-500
                                    focus:ring-2
                                    focus:ring-blue-200
                                "
                            />

                        </div>

                        <div>

                            <label
                                className="
                                    mb-2
                                    block
                                    text-sm
                                    font-medium
                                    text-slate-700
                                "
                            >
                                Categoria
                            </label>

                            <select
                                value={categoriaId}
                                onChange={(e) =>
                                    setCategoriaId(
                                        e.target.value
                                    )
                                }
                                className="
                                    w-full
                                    rounded-xl
                                    border
                                    border-slate-300
                                    px-4
                                    py-3
                                    outline-none
                                    transition
                                    focus:border-blue-500
                                    focus:ring-2
                                    focus:ring-blue-200
                                "
                            >

                                <option value="">
                                    Selecione uma categoria
                                </option>

                                {categorias.map(categoria => (

                                    <option
                                        key={categoria.id}
                                        value={categoria.id}
                                    >
                                        {categoria.nome}
                                    </option>

                                ))}

                            </select>

                        </div>

                    </div>

                    <div>

                        <label
                            className="mb-2 block text-sm font-medium text-slate-700"
                        >
                            Imagem
                        </label>

                        <input
                            type="file"
                            accept="image/*"
                            onChange={(e) =>
                                setImagem(
                                    e.target.files[0]
                                )
                            }
                        />

                    </div>

                    <div className="flex justify-end">

                        <button
                            type="submit"
                            className="
                                rounded-xl
                                bg-blue-600
                                px-6
                                py-3
                                font-semibold
                                text-white
                                transition
                                hover:bg-blue-700
                            "
                        >
                            Salvar Produto
                        </button>

                    </div>

                </form>

            </div>

            <div
                className="
        mt-8
        rounded-2xl
        border
        border-slate-200
        bg-white
        p-8
        shadow-sm
    "
            >

                <h2
                    className="
            mb-6
            text-2xl
            font-bold
        "
                >
                    Produtos Cadastrados
                </h2>

                <div className="space-y-4">

                    {produtos.map(produto => (

                        <div
                            key={produto.id}
                            className="
                    rounded-xl
                    border
                    p-4
                "
                        >

                            {editando === produto.id ? (

                                <div className="space-y-3">

                                    <input
                                        value={editNome}
                                        onChange={(e) =>
                                            setEditNome(
                                                e.target.value
                                            )
                                        }
                                        className="w-full border rounded p-2"
                                    />

                                    <textarea
                                        value={editDescricao}
                                        onChange={(e) =>
                                            setEditDescricao(
                                                e.target.value
                                            )
                                        }
                                        className="w-full border rounded p-2"
                                    />

                                    <input
                                        type="number"
                                        value={editPreco}
                                        onChange={(e) =>
                                            setEditPreco(
                                                e.target.value
                                            )
                                        }
                                        className="w-full border rounded p-2"
                                    />

                                    <select
                                        value={editCategoriaId}
                                        onChange={(e) =>
                                            setEditCategoriaId(
                                                e.target.value
                                            )
                                        }
                                        className="w-full border rounded p-2"
                                    >

                                        {categorias.map(categoria => (

                                            <option
                                                key={categoria.id}
                                                value={categoria.id}
                                            >
                                                {categoria.nome}
                                            </option>

                                        ))}

                                    </select>

                                    <input
                                        type="file"
                                        accept="image/*"
                                        onChange={(e) =>
                                            setEditImagem(
                                                e.target.files[0]
                                            )
                                        }
                                    />

                                    <div className="flex gap-2">

                                        <button
                                            onClick={() =>
                                                salvarEdicao(
                                                    produto.id
                                                )
                                            }
                                            className="
                                    rounded-lg
                                    bg-green-600
                                    px-4
                                    py-2
                                    text-white
                                "
                                        >
                                            Salvar
                                        </button>

                                        <button
                                            onClick={() =>
                                                setEditando(null)
                                            }
                                            className="
                                    rounded-lg
                                    bg-gray-500
                                    px-4
                                    py-2
                                    text-white
                                "
                                        >
                                            Cancelar
                                        </button>

                                    </div>

                                </div>

                            ) : (

                                <>

                                    {produto.imagem && (

                                        <img
                                            src={produto.imagem}
                                            alt={produto.nome}
                                            className="
                                    mb-3
                                    h-32
                                    w-32
                                    rounded-lg
                                    object-cover
                                "
                                        />

                                    )}

                                    <h3 className="font-bold">
                                        {produto.nome}
                                    </h3>

                                    <p>
                                        {produto.descricao}
                                    </p>

                                    <p>
                                        R$ {produto.preco}
                                    </p>

                                    <div className="mt-3 flex gap-2">

                                        <button
                                            onClick={() =>
                                                iniciarEdicao(
                                                    produto
                                                )
                                            }
                                            className="
                                    rounded-lg
                                    bg-yellow-500
                                    px-4
                                    py-2
                                    text-white
                                "
                                        >
                                            Editar
                                        </button>

                                        <button
                                            onClick={() =>
                                                excluirProduto(
                                                    produto.id
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

                                </>

                            )}

                        </div>

                    ))}

                </div>

            </div>

        </div>

    );
}

export default AdminProductsPage;