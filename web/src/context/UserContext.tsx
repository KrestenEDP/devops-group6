import { createContext, useContext, useState, type ReactNode } from "react";

// Only local login so far

export interface User {
    id: string;
    name: string;
    email: string;
}

interface UserContextProps {
    user: User | null;
    login: (user: User) => void;
    logout: () => void;
    isLoggedIn: boolean;
}

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

    const login = (newUser: User) => {
        setUser(newUser);
        try {
            localStorage.setItem("user", JSON.stringify(newUser));
        } catch { /* empty */ }
    };

    const logout = () => {
        setUser(null);
        try {
            localStorage.removeItem("user");
        } catch { /* empty */ }
    };

    const isLoggedIn = !!user;

    return (
        <UserContext.Provider value={{ user, login, logout, isLoggedIn}}>
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
