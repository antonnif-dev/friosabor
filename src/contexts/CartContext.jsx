import {
    createContext,
    useState,
    useEffect
} from "react";


export const CartContext =
    createContext();

export function CartProvider({
    children
}) {

    const [items, setItems] =
        useState(() => {

            const storage =

                localStorage.getItem(
                    "cart"
                );

            return storage
                ? JSON.parse(storage)
                : [];
        });

    useEffect(() => {

        localStorage.setItem(
            "cart",
            JSON.stringify(items)
        );

    }, [items]);

    function addItem(produto) {

        const existingItem =
            items.find(
                item =>
                    item.id === produto.id
            );

        if (existingItem) {

            setItems(

                items.map(item =>

                    item.id === produto.id

                        ? {
                            ...item,
                            quantidade:
                                item.quantidade + 1
                        }

                        : item

                )

            );

            return;
        }

        setItems([
            ...items,
            {
                ...produto,
                quantidade: 1
            }
        ]);
        alert("Adcionado ao carrinho!");
    }

    function removeItem(id) {

        setItems(
            items.filter(
                item =>
                    item.id !== id
            )
        );
    }

    function increaseQuantity(id) {

        setItems(

            items.map(item =>

                item.id === id

                    ? {
                        ...item,
                        quantidade:
                            item.quantidade + 1
                    }

                    : item

            )

        );
    }

    function decreaseQuantity(id) {

        setItems(

            items
                .map(item =>

                    item.id === id

                        ? {
                            ...item,
                            quantidade:
                                item.quantidade - 1
                        }

                        : item

                )

                .filter(
                    item =>
                        item.quantidade > 0
                )

        );
    }

    function clearCart() {

        setItems([]);
    }

    const total = items.reduce(
        (acc, item) =>

            acc +

            (
                item.preco *
                item.quantidade
            ),

        0
    );

    const cartCount = items.reduce((acc, item) => {
        return acc + item.quantidade;
    }, 0);

    return (

        <CartContext.Provider

            value={{
                items,
                addItem,
                removeItem,
                increaseQuantity,
                decreaseQuantity,
                clearCart,
                total,
                cartCount
            }}

        >

            {children}

        </CartContext.Provider>

    );
}