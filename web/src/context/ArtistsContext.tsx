import { createDataContext } from "./createDataContext";
import type { Artist } from "@customTypes/artist.ts";
import { mockArtists } from "@features/artists/mockData/mockArtists";

// Fake API for demonstration
const fetchArtists = async () => {
    // Replace with real API call: await fetch("/api/artists").then(res => res.json())
    /*const res = await fetch("/api/auctions");
    if (!res.ok) throw new Error("Failed to fetch auctions");
    return await res.json() as Promise<Auction[]>;*/
    return new Promise<Artist[]>((resolve) => setTimeout(() => resolve(mockArtists), 500));
};

export const { Provider: ArtistsProvider, useDataContext: useArtists } = createDataContext<Artist>(fetchArtists, "Artists");
