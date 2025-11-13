import { createContext, useContext, useState, type ReactNode } from "react";

// Only local login so far
export interface User {
    id: string;
    name: string;
    email: string;
    role: string;
    token?: string;
}

interface UserContextProps {
    user: User | null;
    isLoggedIn: boolean;
    login: (email: string, password: string) => Promise<void>;
    register: (email: string, password: string) => Promise<void>;
    logout: () => void;
}

const API_BASE = import.meta.env.VITE_API_URL;

const UserContext = createContext<UserContextProps | undefined>(undefined);

export const UserProvider = ({ children }: { children: ReactNode }) => {
    const [user, setUser] = useState<User | null>(() => {
        try {
            const raw = localStorage.getItem("user");
            return raw ? (JSON.parse(raw) as User) : null;
        } catch {
            return null;
        }
    });

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

    const register = async (email: string, password: string) => {
        const res = await fetch(`${API_BASE}/auth/register`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ email, password }),
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

    const logout = () => {
        setUser(null);
        try {
            localStorage.removeItem("user");
            localStorage.removeItem("token");
        } catch { /* empty */ }
    };

    const isLoggedIn = !!user;

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
