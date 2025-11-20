import {createContext, useContext, useState, type ReactNode, useEffect, useCallback} from "react";
import {setLogoutHandler} from "@context/util/usersession.ts";
import {validateToken} from "@context/util/validateToken.ts";

// Only local login so far
export interface User {
    id: string;
    userName: string;
    email: string;
    role: string;
    token?: string;
}

interface UserContextProps {
    user: User | null;
    isLoggedIn: boolean;
    login: (email: string, password: string) => Promise<void>;
    register: (userName: string, email: string, password: string) => Promise<void>;
    logout: () => void;
}

const API_BASE = import.meta.env.VITE_API_URL;

const UserContext = createContext<UserContextProps | undefined>(undefined);

export const UserProvider = ({ children }: { children: ReactNode }) => {
    const [user, setUser] = useState<User | null>(null);

    const saveUser = (token: string, userData: User) => {
        const fullUser = { ...userData, token };
        setUser(fullUser);
        localStorage.setItem("user", JSON.stringify(fullUser));
        localStorage.setItem("token", token);
    };

    const login = async (email: string, password: string) => {
        const res = await fetch(`${API_BASE}/auth/login`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ email, password }),
        });

        if (!res.ok) {
            let errorMessage = "Login failed.";
            try {
                const data = await res.json();
                if (data?.message) errorMessage = data.message;
            } catch { /* empty */ }
            throw new Error(errorMessage);
        }

        const data = await res.json();
        saveUser(data.token, data.user);
    };

    const register = async (userName: string, email: string, password: string) => {
        const res = await fetch(`${API_BASE}/auth/register`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ userName, email, password }),
        });

        if (!res.ok) {
            let errorMessage = "Registration failed.";
            try {
                const data = await res.json();
                if (Array.isArray(data)) {
                    // Combine all descriptions into one message
                    errorMessage = data.map((e: any) => e.description).join(" ");
                } else if (data?.message) {
                    errorMessage = data.message;
                }
            } catch { /* empty */ }
            throw new Error(errorMessage);
        }

        const data = await res.json();
        saveUser(data.token, data.user);
    }

    const logout = useCallback(() => {
        if (!user || localStorage.getItem("token") === null) {
            alert("You have been logged out.");
        }
        setUser(null);
        try {
            localStorage.removeItem("user");
            localStorage.removeItem("token");
        } catch { /* empty */ }

    }, []);

    useEffect(() => {
        (async () => {
            try {
                const rawUser = localStorage.getItem("user");
                const token = localStorage.getItem("token");

                console.log("User: " + rawUser);
                console.log("Token: " + token);

                if (!token || !rawUser) {
                    logout();
                    return;
                }

                const validUser = await validateToken(token);
                if (validUser) {
                    console.log("Validated User: " + JSON.stringify(validUser));
                    setUser({ ...validUser, token });
                } else {
                    console.log("Token validation failed.");
                    logout();
                }
            } catch {
                logout();
            }
        })();
    }, [logout]);

    const isLoggedIn = !!user;

    useEffect(() => {
        setLogoutHandler(logout);
    }, [logout]);

    return (
        <UserContext.Provider value={{ user, login, register, logout, isLoggedIn}}>
            {children}
        </UserContext.Provider>
    );
};

// Hook for components
export const useUser = () => {
    const context = useContext(UserContext);
    if (!context) throw new Error("useUser must be used within UserProvider");
    return context;
};
