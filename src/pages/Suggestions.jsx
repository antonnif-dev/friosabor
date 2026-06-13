import { useEffect, useState, useContext } from "react";
import { api } from "../services/api";
import { AuthContext } from "../contexts/AuthContext";
import Input from "../components/Input";
import Select from "../components/Select";
import Textarea from "../components/Textarea";

function Suggestions() {

    const [estatisticas, setEstatisticas] = useState(null);
    const [pratos, setPratos] = useState([]);
    const [sugestoesGerais, setSugestoesGerais] = useState([]);
    const [hallFama, setHallFama] = useState([]);
    const [pesquisas, setPesquisas] = useState([]);
    const { user } = useContext(AuthContext);

    const [nome, setNome] = useState("");
    const [descricao, setDescricao] = useState("");
    const [ingredientes, setIngredientes] = useState("");
    const [categoria, setCategoria] = useState("");
    const [faixaPreco, setFaixaPreco] = useState("");

    const [categoriaGeral, setCategoriaGeral] = useState("");
    const [descricaoGeral, setDescricaoGeral] = useState("");

    const [editandoEstatisticas, setEditandoEstatisticas] = useState(false);

    const [formEstatisticas, setFormEstatisticas] = useState({
        total_sugestoes: 0,
        pratos_criados: 0,
        sugestoes_aprovadas: 0,
        pratos_desenvolvimento: 0
    });

    const [novoHallCliente, setNovoHallCliente] = useState("");
    const [novoHallPrato, setNovoHallPrato] = useState("");
    const [novoHallDescricao, setNovoHallDescricao] = useState("");
    const [novoHallData, setNovoHallData] = useState("");
    const [novoHallNome, setNovoHallNome] = useState("");
    const [novoHallSugestao, setNovoHallSugestao] = useState("");

    useEffect(() => {

        carregar();

    }, []);

    async function carregar() {

        try {

            const [
                estatisticasRes,
                pratosRes,
                geraisRes,
                hallRes,
                pesquisasRes
            ] = await Promise.all([
                api.get("/sugestoes/estatisticas"),
                api.get("/sugestoes/pratos"),
                api.get("/sugestoes/gerais"),
                api.get("/sugestoes/hall-fama"),
                api.get("/sugestoes/pesquisas")
            ]);

            setEstatisticas(estatisticasRes.data);
            setPratos(pratosRes.data);
            setSugestoesGerais(geraisRes.data);
            setHallFama(hallRes.data);
            setPesquisas(pesquisasRes.data);
            setFormEstatisticas(estatisticasRes.data);

        } catch (error) {

            console.error(error);
        }
    }

    async function handleCriarPrato(e) {
        e.preventDefault();

        try {

            await api.post(
                "/sugestoes/pratos",
                {
                    nome,
                    descricao,

                    ingredientes:
                        ingredientes
                            .split(","),

                    categoria,

                    faixa_preco:
                        faixaPreco
                }
            );

            alert(
                "Sugestão enviada!"
            );

            setNome("");
            setDescricao("");
            setIngredientes("");
            setCategoria("");
            setFaixaPreco("");

            carregar();

        } catch (error) {

            console.error(error);
        }
    }

    async function handleSugestaoGeral(e) {

        e.preventDefault();

        try {

            await api.post(
                "/sugestoes/gerais",
                {
                    categoria:
                        categoriaGeral,

                    descricao:
                        descricaoGeral
                }
            );

            alert(
                "Sugestão enviada!"
            );

            setCategoriaGeral("");
            setDescricaoGeral("");

            carregar();

        } catch (error) {

            console.error(error);
        }
    }

    async function votar(id) {

        try {

            await api.post(
                `/sugestoes/pratos/${id}/votar`
            );

            carregar();

        } catch (error) {

            console.error(error);
        }
    }

    async function votarPesquisa(
        pesquisaId,
        opcaoId
    ) {

        try {

            await api.post(
                `/sugestoes/pesquisas/${pesquisaId}/votar`,
                {
                    opcao_id: opcaoId
                }
            );

            alert(
                "Voto registrado!"
            );

        } catch (error) {

            console.error(error);
        }
    }

    async function salvarEstatisticas() {

        try {

            await api.put(
                `/sugestoes/estatisticas/${estatisticas.id}`,
                formEstatisticas
            );

            alert(
                "Estatísticas atualizadas"
            );

            carregar();

        } catch (error) {

            console.error(error);
        }
    }

    async function criarHallFama() {

        try {

            await api.post("/sugestoes/hall-fama", {
                cliente_nome: novoHallCliente,
                prato: novoHallPrato,
                descricao: novoHallDescricao,
                data_lancamento: novoHallData
            }
            );

            setNovoHallCliente("");
            setNovoHallPrato("");
            setNovoHallDescricao("");
            setNovoHallData("");

            carregar();

        } catch (error) {

            console.error(error);
        }
    }

    async function excluirHallFama(id) {

        try {

            await api.delete(
                `/sugestoes/hall-fama/${id}`
            );

            carregar();

        } catch (error) {

            console.error(error);
        }
    }

    function getCategoriaClass(categoria) {

        switch (categoria) {

            case "Atendimento":
                return "bg-green-100 text-green-700";

            case "Entrega":
                return "bg-blue-100 text-blue-700";

            case "Aplicativo":
                return "bg-purple-100 text-purple-700";

            case "Cardápio":
                return "bg-orange-100 text-orange-700";

            default:
                return "bg-slate-100 text-slate-700";
        }
    }

    async function votar(id) {

        try {

            await api.post(
                `/sugestoes/pratos/${id}/votar`
            );

            // ATUALIZA LISTA
            carregar();

        } catch (error) {

            console.error(error);
        }
    }

    return (

        <div className="px-4 py-10 space-y-12">

            <div className="text-center space-y-3">
                <h1 className="text-4xl md:text-5xl font-bold tracking-tight">
                    Ajude a montar nosso próximo cardápio
                </h1>

                <p className="text-slate-600 max-w-2xl mx-auto text-lg">
                    Sua opinião é importante. Envie sugestões de pratos, melhorias no atendimento e vote nas ideias que gostaria de ver no cardápio.
                </p>
            </div>

            {/* cards das estatísticas */}
            <div
                className="
        grid
        gap-4
        md:grid-cols-4
        mb-10
    "
            >

                <div className="rounded-xl border bg-white p-5 shadow-sm hover:shadow-md transition">
                    <h3 className="text-3xl font-bold text-slate-900">
                        {estatisticas?.total_sugestoes}
                    </h3>
                    <p className="text-slate-500 text-sm mt-1">
                        Sugestões enviadas
                    </p>
                </div>

                <div className="rounded-xl border bg-white p-5 shadow-sm hover:shadow-md transition">
                    <h3 className="text-3xl font-bold text-slate-900">
                        {estatisticas?.pratos_criados}
                    </h3>

                    <p className="text-slate-500 text-sm mt-1">
                        Pratos criados
                    </p>
                </div>

                <div className="rounded-xl border bg-white p-5 shadow-sm hover:shadow-md transition">
                    <h3 className="text-3xl font-bold text-slate-900">
                        {estatisticas?.sugestoes_aprovadas}
                    </h3>

                    <p className="text-slate-500 text-sm mt-1">
                        Sugestões aprovadas
                    </p>
                </div>

                <div className="rounded-xl border bg-white p-5 shadow-sm hover:shadow-md transition">
                    <h3 className="text-3xl font-bold text-slate-900">
                        {estatisticas?.pratos_desenvolvimento}
                    </h3>

                    <p className="text-slate-500 text-sm mt-1">
                        Em desenvolvimento
                    </p>
                </div>

            </div>

            {/* sugestão de pratos */}
            <form
                onSubmit={handleCriarPrato}
                className="bg-white border-2 border-blue-600 rounded-xl p-6 shadow-sm space-y-4"
            >

                <h1 className="text-xl md:text-3xl text-center font-bold tracking-tight">Deixe sua sugestão de prato</h1>

                <Input
                    label="Nome do prato"
                    value={nome}
                    onChange={(e) =>
                        setNome(e.target.value)
                    }
                    placeholder="Nome do prato"
                />

                <Textarea
                    label="Descrição"
                    value={descricao}
                    onChange={(e) =>
                        setDescricao(e.target.value)
                    }
                    placeholder="Descrição"
                />

                <Input
                    label="Ingredientes"
                    value={ingredientes}
                    onChange={(e) =>
                        setIngredientes(
                            e.target.value
                        )
                    }
                    placeholder="
    Ingredientes separados
    por vírgula"
                />

                <Select
                    label="Categoria"
                    value={categoria}
                    onChange={(e) =>
                        setCategoria(
                            e.target.value
                        )
                    }
                >
                    <option value="">
                        Selecione
                    </option>

                    <option value="Tradicional">
                        Tradicional
                    </option>

                    <option value="Fitness">
                        Fitness
                    </option>

                    <option value="Vegetariana">
                        Vegetariana
                    </option>

                    <option value="Vegana">
                        Vegana
                    </option>

                    <option value="Low Carb">
                        Low Carb
                    </option>

                    <option value="Premium">
                        Premium
                    </option>
                </Select>

                <Select
                    label="Quanto pagaria por essa marmita?"
                    value={faixaPreco}
                    onChange={(e) =>
                        setFaixaPreco(
                            e.target.value
                        )
                    }
                >
                    <option value="">
                        Selecione
                    </option>

                    <option value="Até R$15">
                        Até R$15
                    </option>

                    <option value="R$20">
                        R$20
                    </option>

                    <option value="R$25">
                        R$25
                    </option>

                    <option value="R$30+">
                        R$30+
                    </option>

                </Select>

                <button className="w-full bg-red-500 text-white py-2 rounded-lg font-medium hover:bg-red-700 transition">
                    Enviar sugestão
                </button>

            </form>

            <div>
                {pratos.map(prato => (

                    <div className="rounded-xl border-2 border-blue-600 bg-white p-5 shadow-sm hover:shadow-md transition space-y-2">

                        <h3 className="text-xl font-bold">{prato.nome}</h3>

                        <p className="text-slate-600">{prato.descricao}</p>

                        <div className="flex justify-between text-sm text-slate-500">
                            <span>{prato.categoria}</span>
                            <span>🔥 {prato.votos} votos</span>
                        </div>

                        {pratos.map((item) => (

                            <div key={item.id}>

                                <button
                                    onClick={() => votar(item.id)}
                                    disabled={item.jaVotou}
                                    className={`
                mt-2 px-4 py-1 rounded-lg text-white transition
                ${item.jaVotou
                                            ? "bg-gray-400 cursor-not-allowed"
                                            : "bg-green-500 hover:bg-green-600"
                                        }
            `}
                                >
                                    {item.jaVotou ? "Você já votou" : "Votar"}
                                </button>

                            </div>

                        ))}

                    </div>

                ))}
            </div>

            {/* sugestões gerais */}
            <form
                className="bg-white border-2 border-blue-600 rounded-xl p-6 space-y-4"
                onSubmit={
                    handleSugestaoGeral
                }
            >

                <h1 className="text-xl md:text-3xl text-center font-bold tracking-tight">Tem alguma sugestão sobre o antendimento?</h1>

                <Select
                    label="Categoria"
                    value={categoriaGeral}
                    onChange={(e) =>
                        setCategoriaGeral(
                            e.target.value
                        )
                    }
                >
                    <option value="">
                        Selecione
                    </option>

                    <option value="Atendimento">
                        Atendimento
                    </option>

                    <option value="Entrega">
                        Entrega
                    </option>

                    <option value="Aplicativo">
                        Aplicativo
                    </option>

                    <option value="Cardapio">
                        Cardápio
                    </option>

                </Select>

                <Textarea
                    label="Descreva sua sugestão ou crítica"
                    value={descricaoGeral}
                    onChange={(e) =>
                        setDescricaoGeral(
                            e.target.value
                        )
                    }
                />

                <button className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition">
                    Enviar sugestão
                </button>

            </form>

            {user?.role === "admin" && (
                <div className="mt-8">

                    <h2 className="text-2xl font-bold mb-4">
                        Sugestões enviadas
                    </h2>

                    <div className="space-y-4">

                        {sugestoesGerais.map((sugestao) => (

                            <div
                                key={sugestao.id}
                                className="
                    rounded-xl
                    border
                    border-slate-200
                    bg-white
                    p-5
                "
                            >

                                <div className="flex items-center gap-2 mb-2">

                                    <span
                                        className={`
                            px-3
                            py-1
                            rounded-full
                            bg-blue-100
                            text-blue-700
                            text-sm
                            font-medium
                            ${getCategoriaClass(
                                            sugestao.categoria
                                        )}
                                        `}
                                    >
                                        {sugestao.categoria}
                                    </span>

                                </div>

                                <p className="text-slate-700">
                                    {sugestao.descricao}
                                </p>

                                <p className="text-xs text-slate-500 mt-3">
                                    {new Date(
                                        sugestao.created_at
                                    ).toLocaleDateString("pt-BR")}
                                </p>

                            </div>

                        ))}

                    </div>
                </div>
            )}

            {/* hall da fama */}
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

            </section>

            {pesquisas.map(pesquisa => (

                <div
                    key={pesquisa.id}
                    className="rounded-xl border bg-white p-5 space-y-3"
                >

                    <h3>
                        {pesquisa.pergunta}
                    </h3>

                    {pesquisa.pesquisa_opcoes
                        ?.map(opcao => (

                            <label
                                key={opcao.id}
                                className="flex items-center gap-2 p-2 rounded hover:bg-slate-50 cursor-pointer"
                            >

                                <input
                                    className="accent-orange-500"
                                    type="radio"
                                    name={pesquisa.id}
                                    onChange={() =>
                                        votarPesquisa(
                                            pesquisa.id,
                                            opcao.id
                                        )
                                    }
                                />

                                {opcao.texto}

                            </label>

                        ))
                    }

                </div>

            ))}

            {/* estatísticas dos cards */}
            {user?.role === "admin" && (

                <section
                    className="
        mt-16
        rounded-2xl
        border
        border-slate-200
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
                        Administração
                    </h2>

                    {/* Estatísticas */}

                    <div className="mb-10">

                        <h3
                            className="
                mb-4
                text-xl
                font-semibold
            "
                        >
                            Estatísticas
                        </h3>

                        <div
                            className="
                grid
                gap-4
                md:grid-cols-2
            "
                        >

                            <input
                                type="number"
                                value={
                                    formEstatisticas.total_sugestoes
                                }
                                onChange={(e) =>
                                    setFormEstatisticas({
                                        ...formEstatisticas,
                                        total_sugestoes:
                                            Number(
                                                e.target.value
                                            )
                                    })
                                }
                                placeholder="Sugestões"
                                className="border p-3 rounded-xl"
                            />

                            <input
                                type="number"
                                value={
                                    formEstatisticas.pratos_criados
                                }
                                onChange={(e) =>
                                    setFormEstatisticas({
                                        ...formEstatisticas,
                                        pratos_criados:
                                            Number(
                                                e.target.value
                                            )
                                    })
                                }
                                placeholder="Pratos Criados"
                                className="border p-3 rounded-xl"
                            />

                            <input
                                type="number"
                                value={
                                    formEstatisticas.sugestoes_aprovadas
                                }
                                onChange={(e) =>
                                    setFormEstatisticas({
                                        ...formEstatisticas,
                                        sugestoes_aprovadas:
                                            Number(
                                                e.target.value
                                            )
                                    })
                                }
                                placeholder="Aprovadas"
                                className="border p-3 rounded-xl"
                            />

                            <input
                                type="number"
                                value={
                                    formEstatisticas.pratos_desenvolvimento
                                }
                                onChange={(e) =>
                                    setFormEstatisticas({
                                        ...formEstatisticas,
                                        pratos_desenvolvimento:
                                            Number(
                                                e.target.value
                                            )
                                    })
                                }
                                placeholder="Desenvolvimento"
                                className="border p-3 rounded-xl"
                            />

                        </div>

                        <button
                            onClick={salvarEstatisticas}
                            className="
                mt-4
                rounded-xl
                bg-blue-600
                px-5
                py-3
                text-white
            "
                        >
                            Salvar Estatísticas
                        </button>

                    </div>

                    {/* Hall da fama */}

                    <div className="mb-10">

                        <h3
                            className="
                mb-4
                text-xl
                font-semibold
            "
                        >
                            Hall da Fama
                        </h3>

                        <div
                            className="
                grid
                gap-4
                mb-4
            "
                        >

                            <input
                                value={novoHallCliente}
                                onChange={(e) =>
                                    setNovoHallCliente(
                                        e.target.value
                                    )
                                }
                                placeholder="Nome do cliente"
                                className="border p-3 rounded-xl"
                            />

                            <input
                                value={novoHallPrato}
                                onChange={(e) =>
                                    setNovoHallPrato(
                                        e.target.value
                                    )
                                }
                                placeholder="Prato aprovado"
                                className="border p-3 rounded-xl"
                            />

                            <textarea
                                value={novoHallDescricao}
                                onChange={(e) =>
                                    setNovoHallDescricao(
                                        e.target.value
                                    )
                                }
                                placeholder="Descrição do prato"
                                className="
        border
        p-3
        rounded-xl
        min-h-[120px]
    "
                            />

                            <input
                                type="date"
                                value={novoHallData}
                                onChange={(e) =>
                                    setNovoHallData(
                                        e.target.value
                                    )
                                }
                                className="border p-3 rounded-xl"
                            />

                        </div>

                        <button
                            onClick={criarHallFama}
                            className="
                rounded-xl
                bg-green-600
                px-5
                py-3
                text-white
            "
                        >
                            Adicionar ao Hall da Fama
                        </button>

                        <div className="mt-6">

                            {hallFama.map(item => (

                                <div
                                    key={item.id}
                                    className="
                        flex
                        items-center
                        justify-between
                        border-b
                        py-3
                    "
                                >

                                    <div>

                                        <h4 className="font-bold">
                                            {item.cliente_nome}
                                        </h4>

                                        <p className="text-slate-700">
                                            {item.prato}
                                        </p>

                                        <p className="text-sm text-slate-500">
                                            {item.descricao}
                                        </p>

                                        <p className="text-xs text-slate-400 mt-2">
                                            Lançado em {
                                                item.data_lancamento
                                                    ?.split("-")
                                                    .reverse()
                                                    .join("/")
                                            }
                                        </p>

                                    </div>

                                    <button
                                        onClick={() =>
                                            excluirHallFama(
                                                item.id
                                            )
                                        }
                                        className="
                            rounded-lg
                            bg-red-600
                            px-3
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

                </section>

            )}

        </div>
    );

}

export default Suggestions;