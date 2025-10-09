import { createDataContext } from "./createDataContext";
import type { Artist } from "@customTypes/artist.ts";
import { mockArtists } from "@features/artists/mockData/mockArtists";

// Fake API for demonstration
const fetchArtists = async () => {
    // Replace with real API call: await fetch("/api/artists").then(res => res.json())
    return new Promise<Artist[]>((resolve) => setTimeout(() => resolve(mockArtists), 500));
};

export const { Provider: ArtistsProvider, useDataContext: useArtists } = createDataContext<Artist>(fetchArtists, "Artists");
