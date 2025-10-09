import { createDataContext } from "./createDataContext";
import type { Auction } from "@customTypes/auction.ts";
import { mockAuctions } from "@features/paintings/mockData/mockAuctions";

// Fake API for demonstration
const fetchAuctions = async () => {
    // Replace with real API call: await fetch("/api/auctions").then(res => res.json())
    return new Promise<Auction[]>((resolve) => setTimeout(() => resolve(mockAuctions), 500));
};

export const { Provider: AuctionsProvider, useDataContext: useAuctions } = createDataContext<Auction>(fetchAuctions, "Auctions");
