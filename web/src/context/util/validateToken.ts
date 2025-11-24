import type {User} from "@context/UserContext";

const API_BASE = import.meta.env.VITE_API_URL;

export async function validateToken(token: string | null): Promise<User | null> {
    if (!token) return null;

    try {
        const res = await fetch(`${API_BASE}/auth/validate`, {
            headers: {
                "Content-Type": "application/json",
                ...(token ? { Authorization: `Bearer ${token}` } : {}),
            },
        });


        if (!res.ok) return null;

        return await res.json();
    } catch {
        return null;
    }
}
