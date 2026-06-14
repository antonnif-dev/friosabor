import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
    FaArrowLeft,
    FaMapMarkerAlt,
    FaLocationArrow
} from "react-icons/fa";

import { api } from "../services/api";
import { AuthContext } from "../contexts/AuthContext";

function AddressPage() {

    const navigate = useNavigate();

    const {
        user,
        updateUser
    } = useContext(AuthContext);

    const [loading, setLoading] =
        useState(false);

    const [form, setForm] =
        useState({
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

    async function handleSave(e) {

        e.preventDefault();

        try {

            setLoading(true);

            const response =
                await api.put(
                    "/user/profile",
                    {
                        ...user,
                        ...form
                    }
                );

            updateUser(
                response.data
            );

            alert(
                "Endereço atualizado com sucesso."
            );

            navigate(-1);

        } catch (error) {

            alert(
                error.response?.data?.message ||
                "Erro ao atualizar endereço."
            );

        } finally {

            setLoading(false);

        }

    }

    return (

        <div className="min-h-screen bg-slate-50 pb-32">

            {/* Header */}

            <div className="sticky top-0 z-10 bg-white border-b">

                <div className="flex items-center gap-4 p-4">

                    <button
                        onClick={() => navigate(-1)}
                        className="text-slate-700"
                    >
                        <FaArrowLeft size={20} />
                    </button>

                    <div>

                        <h1 className="text-xl font-bold">
                            Endereço de Entrega
                        </h1>

                        <p className="text-sm text-slate-500">
                            Atualize seu endereço
                        </p>

                    </div>

                </div>

            </div>

            <div className="max-w-2xl mx-auto p-4">

                {/* Endereço Atual */}

                <div
                    className="
                        bg-white
                        rounded-2xl
                        border
                        p-4
                        mb-5
                    "
                >

                    <div className="flex gap-3">

                        <FaMapMarkerAlt
                            size={20}
                            className="text-red-500 mt-1"
                        />

                        <div>

                            <p className="font-semibold">
                                Endereço atual
                            </p>

                            <p className="text-slate-500">

                                {user?.logradouro &&
                                    user?.numero
                                    ? `${user.logradouro}, ${user.numero}`
                                    : "Nenhum endereço cadastrado"}

                            </p>

                        </div>

                    </div>

                </div>

                {/* GPS futuro */}

                <button
                    type="button"
                    className="
                        mb-5
                        w-full
                        flex
                        items-center
                        justify-center
                        gap-2
                        rounded-xl
                        border
                        border-red-200
                        bg-red-50
                        py-3
                        text-red-600
                        font-medium
                    "
                >

                    <FaLocationArrow />

                    Utilizar localização atual

                    <span className="text-xs text-slate-400">
                        (em breve)
                    </span>

                </button>

                {/* Formulário */}

                <form
                    onSubmit={handleSave}
                    className="
                        bg-white
                        rounded-2xl
                        border
                        p-5
                        space-y-4
                    "
                >

                    <div>

                        <label className="block mb-1 font-medium">
                            CEP
                        </label>

                        <input
                            type="text"
                            name="cep"
                            value={form.cep}
                            onChange={handleChange}
                            className="
                                w-full
                                border
                                rounded-xl
                                px-4
                                py-3
                            "
                        />

                    </div>

                    <div>

                        <label className="block mb-1 font-medium">
                            Logradouro
                        </label>

                        <input
                            type="text"
                            name="logradouro"
                            value={form.logradouro}
                            onChange={handleChange}
                            className="
                                w-full
                                border
                                rounded-xl
                                px-4
                                py-3
                            "
                        />

                    </div>

                    <div className="grid grid-cols-2 gap-3">

                        <div>

                            <label className="block mb-1 font-medium">
                                Número
                            </label>

                            <input
                                type="text"
                                name="numero"
                                value={form.numero}
                                onChange={handleChange}
                                className="
                                    w-full
                                    border
                                    rounded-xl
                                    px-4
                                    py-3
                                "
                            />

                        </div>

                        <div>

                            <label className="block mb-1 font-medium">
                                Complemento
                            </label>

                            <input
                                type="text"
                                name="complemento"
                                value={form.complemento}
                                onChange={handleChange}
                                className="
                                    w-full
                                    border
                                    rounded-xl
                                    px-4
                                    py-3
                                "
                            />

                        </div>

                    </div>

                    <div>

                        <label className="block mb-1 font-medium">
                            Bairro
                        </label>

                        <input
                            type="text"
                            name="bairro"
                            value={form.bairro}
                            onChange={handleChange}
                            className="
                                w-full
                                border
                                rounded-xl
                                px-4
                                py-3
                            "
                        />

                    </div>

                    <div className="grid grid-cols-2 gap-3">

                        <div>

                            <label className="block mb-1 font-medium">
                                Cidade
                            </label>

                            <input
                                type="text"
                                name="cidade"
                                value={form.cidade}
                                onChange={handleChange}
                                className="
                                    w-full
                                    border
                                    rounded-xl
                                    px-4
                                    py-3
                                "
                            />

                        </div>

                        <div>

                            <label className="block mb-1 font-medium">
                                Estado
                            </label>

                            <input
                                type="text"
                                name="estado"
                                value={form.estado}
                                onChange={handleChange}
                                className="
                                    w-full
                                    border
                                    rounded-xl
                                    px-4
                                    py-3
                                "
                            />

                        </div>

                    </div>

                    <div>

                        <label className="block mb-1 font-medium">
                            Referência
                        </label>

                        <input
                            type="text"
                            name="referencia"
                            value={form.referencia}
                            onChange={handleChange}
                            className="
                                w-full
                                border
                                rounded-xl
                                px-4
                                py-3
                            "
                            placeholder="Ex: Portão azul"
                        />

                    </div>

                    <button
                        type="submit"
                        disabled={loading}
                        className="
                            w-full
                            rounded-xl
                            bg-red-500
                            py-3
                            text-white
                            font-semibold
                            hover:bg-red-600
                            disabled:opacity-50
                        "
                    >

                        {
                            loading
                                ? "Salvando..."
                                : "Salvar endereço"
                        }

                    </button>

                </form>

            </div>

        </div>
    );
}

export default AddressPage;