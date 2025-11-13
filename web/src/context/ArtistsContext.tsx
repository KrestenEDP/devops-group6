import { createDataContext } from "./createDataContext";
import type { Artist } from "@customTypes/artist.ts";
import {handleApiResponse} from "@context/handleApiResponse.ts";
//import { mockArtists } from "@data/mockArtists.ts";

const API_BASE = import.meta.env.VITE_API_URL;

// Fake API for demonstration
/*const fetchArtists = async () => {
    return new Promise<Artist[]>((resolve) => setTimeout(() => resolve(mockArtists), 500));
};*/

const fetchArtists = async (): Promise<Artist[]> => {
    const token = localStorage.getItem("token");
    const res = await fetch(`${API_BASE}/artists`, {
        headers: {
            "Content-Type": "application/json",
            ...(token ? { Authorization: `Bearer ${token}` } : {}),
        },
    });

    await handleApiResponse(res, "Failed to fetch artists");
    return await res.json();
};

export const { Provider: ArtistsProvider, useDataContext: useArtists } = createDataContext<Artist>(fetchArtists, "Artists");
