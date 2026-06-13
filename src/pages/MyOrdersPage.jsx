import { useEffect, useState } from "react";
import { api } from "../services/api";

function MyOrdersPage() {
    const [pedidos, setPedidos] = useState([]);

    useEffect(() => {
        async function carregar() {
            try {
                const response =
                    await api.get("/pedidos/meus");

                setPedidos(response.data);
            } catch (error) {
                console.error(error);
            }
        }

        carregar();
    }, []);

    function getStatusStyle(status) {
        switch (status?.toLowerCase()) {
            case "pendente":
                return "bg-yellow-100 text-yellow-800";

            case "preparando":
                return "bg-blue-100 text-blue-800";

            case "saiu para entrega":
                return "bg-purple-100 text-purple-800";

            case "entregue":
                return "bg-green-100 text-green-800";

            case "cancelado":
                return "bg-red-100 text-red-800";

            default:
                return "bg-slate-100 text-slate-800";
        }
    }

    return (
        <div className="space-y-8">

            <div>
                <h1 className="text-4xl font-bold text-slate-900">
                    Meus Pedidos
                </h1>

                <p className="mt-2 text-slate-600">
                    Acompanhe seus pedidos realizados.
                </p>
            </div>

            {pedidos.length === 0 && (
                <div
                    className="
                        rounded-2xl
                        border
                        border-slate-200
                        bg-white
                        p-10
                        text-center
                        shadow-sm
                    "
                >
                    <p className="text-slate-600">
                        Você ainda não realizou nenhum pedido.
                    </p>
                </div>
            )}

            <div className="space-y-4">

                {pedidos.map((pedido) => (

                    <div
                        key={pedido.id}
                        className="
                            rounded-2xl
                            border
                            border-slate-200
                            bg-white
                            p-6
                            shadow-sm
                            transition
                            hover:shadow-md
                        "
                    >
                        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">

                            <div>
                                <p className="text-sm text-slate-500">
                                    Pedido
                                </p>

                                <h3 className="font-semibold text-slate-900">
                                    #{pedido.id}
                                </h3>
                            </div>

                            <span
                                className={`
                                    w-fit
                                    rounded-full
                                    px-3
                                    py-1
                                    text-sm
                                    font-medium
                                    ${getStatusStyle(pedido.status)}
                                `}
                            >
                                {pedido.status}
                            </span>

                        </div>

                        <div className="mt-6 border-t border-slate-100 pt-4">

                            <div className="flex items-center justify-between">

                                <span className="text-slate-500">
                                    Total do pedido
                                </span>

                                <span className="text-xl font-bold text-blue-600">
                                    R$ {Number(
                                        pedido.valor_total
                                    ).toFixed(2)}
                                </span>

                            </div>

                        </div>
                    </div>

                ))}

            </div>

        </div>
    );
}

export default MyOrdersPage;