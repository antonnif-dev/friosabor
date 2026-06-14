import { useContext, useState } from "react";
import { CartContext } from "../contexts/CartContext";
import { api } from "../services/api";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../contexts/AuthContext";

function CartPage() {
    const {
        items,
        removeItem,
        increaseQuantity,
        decreaseQuantity,
        clearCart
    } = useContext(CartContext);

    const navigate = useNavigate();
    const { user } = useContext(AuthContext);
    const [mostrarCheckout, setMostrarCheckout] = useState(false);
    const [endereco, setEndereco] = useState("");
    const [numero, setNumero] = ("");
    const [bairro, setBairro] = useState("");
    const [complemento, setComplemento] = useState("");
    const [formaPagamento, setFormaPagamento] = useState("mercadopago");
    const [loadingPagamento, ] = useState(false);

    const subtotal =  items.reduce(
            (total, item) =>
                total +
                (
                    item.preco *
                    item.quantidade
                ),
            0
        );

    /* Cobrar por bairro
    function calcularTaxaEntrega(bairro) {

const taxas = {
    "Centro": 5,
    "Alvorada": 7,
    "Palmeiras": 10,
    "Durval de Barros": 12
};

return taxas[bairro] || 15;
}

const taxaEntrega =
calcularTaxaEntrega(
    bairro
);
*/

    const taxaEntrega = 5;

    const total =
        subtotal +
        taxaEntrega;

    async function handleCheckout() {
        if (!user) {

            navigate("/login");

            return;
        }

        try {
            const response = await api.post("/pedidos", {
                itens: items
            });

            console.log(response.data);

            clearCart();

            alert("Pedido realizado!");
        } catch (error) {
            console.error(error);

            alert("Erro ao finalizar pedido");
        }
    }

    if (items.length === 0) {
        return (
            <div className="mx-auto max-w-xl rounded-2xl border border-slate-200 bg-white p-10 text-center shadow-sm">

                <h1 className="text-3xl font-bold text-slate-900">
                    Carrinho
                </h1>

                <p className="mt-4 text-slate-600">
                    Seu carrinho está vazio.
                </p>

            </div>
        );
    }

    async function pagar() {

        try {

            setLoadingPagamento(
                true
            );

            const response =
                await api.post(
                    "/pagamentos/checkout",
                    {
                        endereco,
                        numero,
                        bairro,
                        complemento,
                        formaPagamento,
                        itens: items,
                        taxaEntrega: taxaEntrega,
                        total
                    }
                );

            window.location.href =
                response.data.url;

        } catch (error) {

            console.error(error);

            alert(
                "Erro ao gerar pagamento"
            );

        } finally {

            setLoadingPagamento(
                false
            );
        }
    }

    return (
        <div className="space-y-8">

            <div>
                <h1 className="text-4xl font-bold text-slate-900">
                    Carrinho
                </h1>

                <p className="mt-2 text-slate-600">
                    Revise seus itens antes de finalizar.
                </p>
            </div>

            <div className="grid gap-8 lg:grid-cols-[2fr_1fr]">

                {/* Itens */}

                <div className="space-y-4">

                    {items.map((item) => (

                        <div
                            key={item.id}
                            className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm"
                        >
                            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">

                                <div>
                                    <h3 className="text-lg font-semibold text-slate-900">
                                        {item.nome}
                                    </h3>

                                    <p className="mt-1 text-blue-600 font-bold">
                                        R$ {Number(item.preco).toFixed(2)}
                                    </p>
                                </div>

                                <div className="flex items-center gap-3">

                                    <button
                                        onClick={() =>
                                            decreaseQuantity(item.id)
                                        }
                                        className="
                                            flex
                                            h-9
                                            w-9
                                            items-center
                                            justify-center
                                            rounded-lg
                                            border
                                            border-slate-300
                                            hover:bg-slate-100
                                        "
                                    >
                                        -
                                    </button>

                                    <span className="w-8 text-center font-semibold">
                                        {item.quantidade}
                                    </span>

                                    <button
                                        onClick={() =>
                                            increaseQuantity(item.id)
                                        }
                                        className="
                                            flex
                                            h-9
                                            w-9
                                            items-center
                                            justify-center
                                            rounded-lg
                                            border
                                            border-slate-300
                                            hover:bg-slate-100
                                        "
                                    >
                                        +
                                    </button>

                                    <button
                                        onClick={() =>
                                            removeItem(item.id)
                                        }
                                        className="
                                            ml-3
                                            rounded-lg
                                            bg-red-50
                                            px-3
                                            py-2
                                            text-sm
                                            font-medium
                                            text-red-600
                                            transition
                                            hover:bg-red-100
                                        "
                                    >
                                        Remover
                                    </button>

                                </div>
                            </div>
                        </div>

                    ))}

                </div>

                {/* Resumo */}

                <div
                    className=" h-fit rounded-2xl border border-slate-200 bg-white p-6 shadow-sm"
                >
                    <h2 className="text-xl font-bold text-slate-900">
                        Resumo do Pedido
                    </h2>

                    <div className="mt-6 flex justify-between">
                        <span className="text-slate-600">
                            Itens
                        </span>

                        <span>
                            {items.length}
                        </span>
                    </div>

                    <div className="mt-6 flex justify-between">
                        <span className="text-slate-600">
                            Entrega
                        </span>

                        <span>
                            R$ {taxaEntrega},00
                        </span>
                    </div>

                    <div className="mt-4 flex justify-between text-lg font-bold">
                        <span>Total</span>

                        <span className="text-blue-600">
                            R$ {Number(total).toFixed(2)}
                        </span>
                    </div>
                    {/*
                    <button
                        onClick={handleCheckout}
                        className="mt-6 w-full rounded-xl bg-blue-600 py-3 font-semibold text-white transition hover:bg-blue-700"
                    >
                        Finalizar Pedido
                    </button>
*/}

                    <button
                        onClick={() =>
                            setMostrarCheckout(true)
                        }
                        className="
        rounded-xl
        bg-green-600
        px-6
        py-3
        text-white
        font-semibold
    "
                    >
                        Finalizar Pedido
                    </button>

                    <button
                        onClick={clearCart}
                        className="
                            mt-3
                            w-full
                            rounded-xl
                            border
                            border-slate-300
                            py-3
                            font-medium
                            text-slate-700
                            transition
                            hover:bg-slate-100
                        "
                    >
                        Limpar Carrinho
                    </button>

                </div>
                {
                    mostrarCheckout && (

                        <div
                            className="
                mt-8
                rounded-2xl
                border
                bg-white
                p-6
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
                                Finalizar Compra
                            </h2>

                            <div
                                className="
                    space-y-2
                    mb-6
                "
                            >

                                {items.map(item => (

                                    <div
                                        key={item.id}
                                        className="
                            flex
                            justify-between
                        "
                                    >

                                        <span>
                                            {item.quantidade}x
                                            {" "}
                                            {item.nome}
                                        </span>

                                        <span>
                                            R$
                                            {" "}
                                            {
                                                (
                                                    item.preco *
                                                    item.quantidade
                                                ).toFixed(2)
                                            }
                                        </span>

                                    </div>

                                ))}

                            </div>

                            <div
                                className="
                    border-t
                    pt-4
                    space-y-2
                "
                            >

                                <div
                                    className="
                        flex
                        justify-between
                    "
                                >
                                    <span>
                                        Subtotal
                                    </span>

                                    <span>
                                        R$
                                        {" "}
                                        {
                                            subtotal.toFixed(2)
                                        }
                                    </span>
                                </div>

                                <div
                                    className="
                        flex
                        justify-between
                    "
                                >
                                    <span>
                                        Entrega
                                    </span>

                                    <span>
                                        R$
                                        {" "}
                                        {
                                            taxaEntrega.toFixed(2)
                                        }
                                    </span>
                                </div>

                                <div className="flex justify-between text-lg font-bold">
                                    <span>Total</span>

                                    <span>
                                        R$
                                        {" "}
                                        {
                                            total.toFixed(2)
                                        }
                                    </span>
                                </div>

                            </div>

                            <div
                                className="
                    mt-8
                    grid
                    gap-4
                "
                            >

                                <input
                                    value={endereco}
                                    onChange={(e) =>
                                        setEndereco(
                                            e.target.value
                                        )
                                    }
                                    placeholder="Rua"
                                    className="
                        rounded-xl
                        border
                        p-3
                    "
                                />

                                <input
                                    value={numero}
                                    onChange={(e) =>
                                        setNumero(
                                            e.target.value
                                        )
                                    }
                                    placeholder="Número"
                                    className="
                        rounded-xl
                        border
                        p-3
                    "
                                />

                                <input
                                    value={bairro}
                                    onChange={(e) =>
                                        setBairro(
                                            e.target.value
                                        )
                                    }
                                    placeholder="Bairro"
                                    className="
                        rounded-xl
                        border
                        p-3
                    "
                                />

                                <input
                                    value={complemento}
                                    onChange={(e) =>
                                        setComplemento(
                                            e.target.value
                                        )
                                    }
                                    placeholder="Complemento"
                                    className="
                        rounded-xl
                        border
                        p-3
                    "
                                />

                            </div>

                            <div
                                className="
                    mt-8
                "
                            >

                                <h3
                                    className="
                        mb-3
                        font-semibold
                    "
                                >
                                    Forma de Pagamento
                                </h3>

                                <div
                                    className="
                        flex
                        flex-col
                        gap-2
                    "
                                >

                                    <label>

                                        <input
                                            type="radio"
                                            value="mercadopago"
                                            checked={
                                                formaPagamento
                                                ===
                                                "mercadopago"
                                            }
                                            onChange={(e) =>
                                                setFormaPagamento(
                                                    e.target.value
                                                )
                                            }
                                        />

                                        {" "}
                                        Mercado Pago
                                    </label>

                                    <label>

                                        <input
                                            type="radio"
                                            value="pix"
                                            checked={
                                                formaPagamento
                                                ===
                                                "pix"
                                            }
                                            onChange={(e) =>
                                                setFormaPagamento(
                                                    e.target.value
                                                )
                                            }
                                        />

                                        {" "}
                                        PIX
                                    </label>

                                    <label>

                                        <input
                                            type="radio"
                                            value="cartao"
                                            checked={
                                                formaPagamento
                                                ===
                                                "cartao"
                                            }
                                            onChange={(e) =>
                                                setFormaPagamento(
                                                    e.target.value
                                                )
                                            }
                                        />

                                        {" "}
                                        Cartão
                                    </label>

                                </div>

                            </div>

                            <button
                                onClick={pagar}
                                disabled={
                                    loadingPagamento
                                }
                                className="
                    mt-8
                    w-full
                    rounded-xl
                    bg-green-600
                    py-4
                    font-semibold
                    text-white
                    hover:bg-green-700
                "
                            >

                                {
                                    loadingPagamento
                                        ? "Gerando pagamento..."
                                        : "Pagar Agora"
                                }

                            </button>

                        </div>

                    )
                }

            </div>

        </div>
    );
}

export default CartPage;