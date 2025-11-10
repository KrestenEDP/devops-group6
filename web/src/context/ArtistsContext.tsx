import { createDataContext } from "./createDataContext";
import type { Artist } from "@customTypes/artist.ts";
//import {handleApiResponse} from "@context/handleApiResponse.ts";
import { mockArtists } from "@features/artists/mockData/mockArtists";

const API_BASE = import.meta.env.VITE_API_URL;
if (!API_BASE) {
    throw new Error(
        "VITE_API_URL is not defined. Make sure you have a .env file in your project root with VITE_API_URL set."
    );
}
// Fake API for demonstration
const fetchArtists = async () => {
    return new Promise<Artist[]>((resolve) => setTimeout(() => resolve(mockArtists), 500));
};

/*const fetchArtists = async (): Promise<Artist[]> => {
    const token = localStorage.getItem("token");
    const res = await fetch(`${API_BASE}/artists`, {
        headers: {
            "Content-Type": "application/json",
            ...(token ? { Authorization: `Bearer ${token}` } : {}),
        },
    });

    await handleApiResponse(res, "Failed to fetch artists");
    return await res.json();
};*/

export const { Provider: ArtistsProvider, useDataContext: useArtists } = createDataContext<Artist>(fetchArtists, "Artists");
