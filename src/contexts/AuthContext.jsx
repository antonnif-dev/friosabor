import {
    createContext,
    useState,
    useEffect
} from "react";

import { api } from "../services/api";

export const AuthContext = createContext();

export function AuthProvider({children}) {

    const [user, setUser] =
        useState(null);

    useEffect(() => {

        const userStorage =
            localStorage.getItem(
                "user"
            );

        if (userStorage) {

            setUser(
                JSON.parse(
                    userStorage
                )
            );
        }

    }, []);

    async function login(
        email,
        password
    ) {

        const response =
            await api.post(
                "/auth/login",
                {
                    email,
                    password
                }
            );

        localStorage.setItem(
            "token",
            response.data.token
        );

        localStorage.setItem(
            "user",
            JSON.stringify(
                response.data.user
            )
        );

        setUser(
            response.data.user
        );
    }

    async function register(data) {

        const response =
            await api.post(
                "/auth/register",
                data
            );

        return response.data;
    }

    function logout() {

        localStorage.removeItem(
            "token"
        );

        localStorage.removeItem(
            "user"
        );

        setUser(null);
    }

    function updateUser(updatedUser) {

        localStorage.setItem(
            "user",
            JSON.stringify(updatedUser)
        );

        setUser(updatedUser);
    }

    return (

        <AuthContext.Provider
            value={{
                user,
                login,
                register,
                logout,
                updateUser
            }}
        >

            {children}

        </AuthContext.Provider>

    );
}