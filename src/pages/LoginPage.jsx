import { useContext, useState } from "react";
import { AuthContext } from "../contexts/AuthContext";
import { useNavigate, Link } from "react-router-dom";
import Input from "../components/Input";

function LoginPage() {

    const navigate = useNavigate();
    const { login, register } = useContext(AuthContext);

    const [isRegister, setIsRegister] = useState(false);
    const [nome, setNome] = useState("");
    const [email, setEmail] =
        useState("");

    const [telefone, setTelefone] =
        useState("");

    const [cpf, setCpf] =
        useState("");

    const [cep, setCep] =
        useState("");

    const [logradouro, setLogradouro] =
        useState("");

    const [numero, setNumero] =
        useState("");

    const [bairro, setBairro] =
        useState("");

    const [cidade, setCidade] =
        useState("");

    const [estado, setEstado] =
        useState("");

    const [complemento, setComplemento] =
        useState("");

    const [password, setPassword] =
        useState("");

    async function handleLogin(e) {

        e.preventDefault();

        try {

            await login(
                email,
                password
            );

            navigate(-1);
            //navigate("/cart");

        } catch (error) {

            console.error(error);

            alert(
                "Email ou senha inválidos"
            );
        }
    }

    async function handleRegister(
        e
    ) {

        e.preventDefault();

        try {

            await register({
                nome,
                email,
                telefone,
                cpf,
                cep,
                logradouro,
                numero,
                bairro,
                cidade,
                estado,
                complemento,
                password
            });

            alert(
                "Conta criada com sucesso"
            );

        } catch (error) {

            console.error(error);

            alert(
                error.response?.data?.message ||
                "Erro ao cadastrar"
            );
        }
    }

    return (

        <div
            className="
                min-h-screen
                grid
                lg:grid-cols-2
            "
        >

            {/* Lado institucional */}

            <div
                className="
                    hidden
                    lg:flex
                    flex-col
                    justify-center
                    bg-blue-600
                    p-16
                    text-white
                "
            >

                <h1 className="text-5xl font-bold">
                    Frio Sabor Marmitas
                </h1>

                <p className="mt-6 text-lg text-blue-100">
                    Faça seus pedidos de forma rápida,
                    acompanhe o status em tempo real e
                    receba tudo no conforto da sua casa.
                </p>

                <div className="mt-12 space-y-6">

                    <div>
                        <h3 className="font-semibold text-xl">
                            🍔 Cardápio Completo
                        </h3>

                        <p className="text-blue-100">
                            Explore todos os produtos disponíveis.
                        </p>
                    </div>

                    <div>
                        <h3 className="font-semibold text-xl">
                            📦 Acompanhamento de Pedidos
                        </h3>

                        <p className="text-blue-100">
                            Veja o andamento de cada pedido.
                        </p>
                    </div>

                    <div>
                        <h3 className="font-semibold text-xl">
                            ⚡ Compra Rápida
                        </h3>

                        <p className="text-blue-100">
                            Salve seus dados e compre em segundos.
                        </p>
                    </div>

                </div>

            </div>

            {/* Formulário */}

            <div
                className="
                    flex
                    items-center
                    justify-center
                    p-6
                    bg-slate-50
                "
            >

                <div
                    className="
                        w-full
                        max-w-md
                        rounded-2xl
                        border
                        border-slate-200
                        bg-white
                        p-8
                        shadow-sm
                    "
                >

                    <div className="mb-8">

                        <h2 className="text-3xl font-bold text-slate-900">
                            {
                                isRegister
                                    ? "Criar Conta"
                                    : "Entrar"
                            }
                        </h2>

                        <p className="mt-2 text-slate-600">
                            Faça login para acessar sua conta.
                        </p>

                    </div>

                    <form
                        onSubmit={
                            isRegister
                                ? handleRegister
                                : handleLogin
                        }
                        className="space-y-5"
                    >

                        <div>

                            {isRegister && (

                                <Input
                                    label="Nome"
                                    value={nome}
                                    onChange={(e) =>
                                        setNome(
                                            e.target.value
                                        )
                                    }
                                    placeholder="Digite seu nome"
                                />

                            )}

                            <Input
                                label="E-mail"
                                type="email"
                                value={email}
                                onChange={(e) =>
                                    setEmail(
                                        e.target.value
                                    )
                                }
                                placeholder="Digite seu e-mail"
                            />

                            {isRegister && (

                                <div className="space-y-4 mt-4">

                                    <Input
                                        label="Telefone"
                                        type="text"
                                        value={telefone}
                                        onChange={(e) =>
                                            setTelefone(
                                                e.target.value
                                            )
                                        }
                                        placeholder="Digite seu telefone"
                                    />

                                    <Input
                                        label="CPF"
                                        type="text"
                                        value={cpf}
                                        onChange={(e) =>
                                            setCpf(
                                                e.target.value
                                            )
                                        }
                                        placeholder="Digite seu CPF"
                                    />

                                    <Input
                                        label="CEP"
                                        type="text"
                                        value={cep}
                                        onChange={(e) =>
                                            setCep(
                                                e.target.value
                                            )
                                        }
                                        placeholder="Digite seu CEP"
                                    />

                                    <Input
                                        label="Rua"
                                        type="text"
                                        value={logradouro}
                                        onChange={(e) =>
                                            setLogradouro(
                                                e.target.value
                                            )
                                        }
                                        placeholder="Digite sua rua"
                                    />

                                    <Input
                                        label="Número"
                                        type="text"
                                        value={numero}
                                        onChange={(e) =>
                                            setNumero(
                                                e.target.value
                                            )
                                        }
                                        placeholder="Número"
                                    />

                                    <Input
                                        label="Bairro"
                                        type="text"
                                        value={bairro}
                                        onChange={(e) =>
                                            setBairro(
                                                e.target.value
                                            )
                                        }
                                        placeholder="Digite seu bairro"
                                    />

                                    <Input
                                        label="Cidade"
                                        type="text"
                                        value={cidade}
                                        onChange={(e) =>
                                            setCidade(
                                                e.target.value
                                            )
                                        }
                                        placeholder="Digite sua cidade"
                                    />

                                    <Input
                                        label="Estado"
                                        type="text"
                                        value={estado}
                                        onChange={(e) =>
                                            setEstado(
                                                e.target.value
                                            )
                                        }
                                        placeholder="Digite seu estado"
                                    />

                                    <Input
                                        label="Complemento"
                                        type="text"
                                        value={complemento}
                                        onChange={(e) =>
                                            setComplemento(
                                                e.target.value
                                            )
                                        }
                                        placeholder="Complemento (opcional)"
                                    />

                                </div>

                            )}

                        </div>

                        <Input
                            label="Senha"
                            type="password"
                            value={password}
                            onChange={(e) =>
                                setPassword(
                                    e.target.value
                                )
                            }
                            placeholder="Digite sua senha"
                        />

                        <button
                            type="submit"
                            className="
            w-full
            rounded-xl
            bg-blue-600
            py-3
            font-semibold
            text-white
            transition
            hover:bg-blue-700
        "
                        >
                            {
                                isRegister
                                    ? "Criar Conta"
                                    : "Entrar"
                            }
                        </button>

                    </form>

                    <div
                        className="
                            mt-6
                            border-t
                            border-slate-200
                            pt-6
                            text-center
                        "
                    >

                        <p className="text-slate-600">

                            {
                                isRegister
                                    ? "Já possui uma conta?"
                                    : "Ainda não possui uma conta?"
                            }

                        </p>

                        <button
                            type="button"
                            onClick={() =>
                                setIsRegister(
                                    !isRegister
                                )
                            }
                            className="
        mt-2
        font-semibold
        text-blue-600
        hover:text-blue-700
    "
                        >

                            {
                                isRegister
                                    ? "Entrar"
                                    : "Criar conta"
                            }

                        </button>

                    </div>

                </div>

            </div>

        </div>

    );
}

export default LoginPage;