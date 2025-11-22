import { useUser } from "@context/UserContext";

const API_BASE = import.meta.env.VITE_API_URL;


export async function getUsers(token: string) {
    const res = await fetch(`${API_BASE}/users`, {
        headers: {
            "Authorization": `Bearer ${token}`,
            "Content-Type": "application/json"
        }
    });

    if (!res.ok) throw new Error("Failed to fetch users");

    return await res.json();
};

export async function searchUsers(query: string, token: string) {
    const res = await fetch(`${API_BASE}/users/search?query=${encodeURIComponent(query)}`, {
        headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
        }
    });
    return await res.json();
}

export async function createArtist(dto: any, token: string) {
    const res = await fetch(`${API_BASE}/artists`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`,
        },
        body: JSON.stringify(dto)
    });

    if (!res.ok) {
        const err = await res.json().catch(() => ({}));
        throw new Error(err.message || "Artist creation failed");
    }

    return await res.json();
}
