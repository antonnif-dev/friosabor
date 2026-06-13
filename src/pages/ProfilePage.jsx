import { api } from "../services/api";
import { AuthContext } from "../contexts/AuthContext";
import { useContext, useState, useEffect } from "react";

function ProfilePage() {

    const { user, updateUser } = useContext(AuthContext);
    const [foto, setFoto] = useState(null);

    const [form, setForm] = useState({
        nome: "",
        email: "",
        telefone: "",
        cpf: "",
        data_nascimento: "",
        cep: "",
        logradouro: "",
        numero: "",
        complemento: "",
        bairro: "",
        cidade: "",
        estado: "",
        referencia: ""
    });

    useEffect(() => {

        if (!user) return;

        setForm({
            nome: user.nome || "",
            email: user.email || "",
            telefone: user.telefone || "",
            cpf: user.cpf || "",
            data_nascimento: user.data_nascimento || "",
            cep: user.cep || "",
            logradouro: user.logradouro || "",
            numero: user.numero || "",
            complemento: user.complemento || "",
            bairro: user.bairro || "",
            cidade: user.cidade || "",
            estado: user.estado || "",
            referencia: user.referencia || ""
        });

    }, [user]);

    function handleChange(e) {

        setForm(prev => ({
            ...prev,
            [e.target.name]: e.target.value
        }));

    }

    const initials =
        user?.nome
            ?.split(" ")
            .map(nome => nome[0])
            .slice(0, 2)
            .join("")
            .toUpperCase() || "?";

    async function handleSave() {

        try {

            let userAtualizado;

            if (foto) {

                const formData =
                    new FormData();

                formData.append(
                    "foto",
                    foto
                );

                const fotoResponse =
                    await api.post(
                        "/user/profile/photo",
                        formData,
                        {
                            headers: {
                                "Content-Type":
                                    "multipart/form-data"
                            }
                        }
                    );

                userAtualizado =
                    fotoResponse.data;
            }

            const response =
                await api.put(
                    "/user/profile",
                    form
                );

            userAtualizado =
                response.data;

            updateUser(
                userAtualizado
            );

            alert(
                "Perfil atualizado com sucesso"
            );

        } catch (error) {

            alert(
                error.response?.data?.message ||
                "Erro ao atualizar perfil"
            );

        }

    }

    return (

        <div>

            <div className="mb-8">

                <p className="mt-2 text-slate-600">
                    Gerencie suas informações pessoais.
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

                <div className="flex flex-col items-center">
                    {
                        user?.foto_perfil ? (

                            <img
                                src={user.foto_perfil}
                                alt={user.nome}
                                className="
                h-24
                w-24
                rounded-full
                object-cover
                border
                border-slate-200
            "
                            />

                        ) : (
                            <div
                                className="
                            flex
                            h-24
                            w-24
                            items-center
                            justify-center
                            rounded-full
                            bg-blue-600
                            text-3xl
                            font-bold
                            text-white
                        "
                            >
                                {initials}
                            </div>
                        )
                    }

                    <div className="mt-4 flex flex-col items-center gap-3">

                        <label
                            htmlFor="fotoPerfil"
                            className="cursor-pointer rounded-lg bg-blue-600 px-4 -2 -sm 
                            font-medium text-white hover:bg-blue-700"
                        >
                            Alterar foto
                        </label>

                        <input
                            id="fotoPerfil"
                            type="file"
                            accept="image/*"
                            className="hidden"
                            onChange={(e) =>
                                setFoto(
                                    e.target.files[0]
                                )
                            }
                        />

                        <h2 className="text-2xl font-bold text-slate-900">
                            {user?.nome}
                        </h2>

                    </div>

                    <p className="mt-1 text-slate-500">
                        {user?.email}
                    </p>

                </div>

                <div className="mt-10 space-y-8">

                    <div>

                        <h3 className="mb-4 text-lg font-semibold">
                            Dados da Conta
                        </h3>

                        <div className="grid gap-4 md:grid-cols-2">

                            <input
                                name="nome"
                                value={form.nome}
                                onChange={handleChange}
                                placeholder="Nome"
                                className="rounded-xl border p-3"
                            />

                            <input
                                name="email"
                                value={form.email}
                                readOnly
                                className="rounded-xl border bg-slate-100 p-3"
                            />

                            <input
                                name="telefone"
                                value={form.telefone}
                                onChange={handleChange}
                                placeholder="Telefone"
                                className="rounded-xl border p-3"
                            />

                            <input
                                name="cpf"
                                value={form.cpf}
                                readOnly
                                className="rounded-xl border bg-slate-100 p-3"
                            />

                            <input
                                type="date"
                                name="data_nascimento"
                                value={form.data_nascimento}
                                onChange={handleChange}
                                className="rounded-xl border p-3"
                            />

                        </div>

                    </div>

                    <div>

                        <h3 className="mb-4 text-lg font-semibold">
                            Endereço
                        </h3>

                        <div className="grid gap-4 md:grid-cols-2">

                            <input
                                name="cep"
                                value={form.cep}
                                onChange={handleChange}
                                placeholder="CEP"
                                className="rounded-xl border p-3"
                            />

                            <input
                                name="logradouro"
                                value={form.logradouro}
                                onChange={handleChange}
                                placeholder="Logradouro"
                                className="rounded-xl border p-3"
                            />

                            <input
                                name="numero"
                                value={form.numero}
                                onChange={handleChange}
                                placeholder="Número"
                                className="rounded-xl border p-3"
                            />

                            <input
                                name="complemento"
                                value={form.complemento}
                                onChange={handleChange}
                                placeholder="Complemento"
                                className="rounded-xl border p-3"
                            />

                            <input
                                name="bairro"
                                value={form.bairro}
                                onChange={handleChange}
                                placeholder="Bairro"
                                className="rounded-xl border p-3"
                            />

                            <input
                                name="cidade"
                                value={form.cidade}
                                onChange={handleChange}
                                placeholder="Cidade"
                                className="rounded-xl border p-3"
                            />

                            <input
                                name="estado"
                                value={form.estado}
                                onChange={handleChange}
                                placeholder="Estado"
                                className="rounded-xl border p-3"
                            />

                            <input
                                name="referencia"
                                value={form.referencia}
                                onChange={handleChange}
                                placeholder="Referência"
                                className="rounded-xl border p-3"
                            />

                        </div>

                    </div>

                    <div className="flex justify-end">

                        <button
                            onClick={handleSave}
                            className="
        rounded-xl
        bg-blue-600
        px-6
        py-3
        font-medium
        text-white
        hover:bg-blue-700
    "
                        >
                            Salvar Alterações
                        </button>

                    </div>

                </div>

            </div>

            <div className="grid gap-4 md:grid-cols-3">

                <div className="rounded-xl bg-white p-6 shadow-sm">
                    <p className="text-slate-500">Pedidos</p>
                    <h3 className="mt-2 text-3xl font-bold">12</h3>
                </div>

                <div className="rounded-xl bg-white p-6 shadow-sm">
                    <p className="text-slate-500">Endereços</p>
                    <h3 className="mt-2 text-3xl font-bold">2</h3>
                </div>

                <div className="rounded-xl bg-white p-6 shadow-sm">
                    <p className="text-slate-500">Conta criada</p>
                    <h3 className="mt-2 text-lg font-bold">Mai/2026</h3>
                </div>

            </div>

        </div>

    );
}

export default ProfilePage;