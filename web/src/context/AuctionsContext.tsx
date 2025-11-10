import {createDataContext, type DataAction, type DataState} from "./createDataContext";
import type { Auction } from "@customTypes/auction.ts";
import React from "react";
import {handleApiResponse} from "@context/handleApiResponse.ts";
//import { mockAuctions } from "@features/paintings/mockData/mockAuctions";

const API_BASE = import.meta.env.VITE_API_URL;

// Fake API for demonstration
/*const fetchAuctions = async () => {
    return new Promise<Auction[]>((resolve) => setTimeout(() => resolve(mockAuctions), 500));
};*/

const fetchAuctions = async (): Promise<Auction[]> => {
    const token = localStorage.getItem("token");
    const res = await fetch(`${API_BASE}/auctions`, {
        headers: {
            "Content-Type": "application/json",
            ...(token ? { Authorization: `Bearer ${token}` } : {}),
        },
    });

    await handleApiResponse(res, "Failed to fetch auctions");
    return await res.json();
};

export const { Provider: AuctionsProvider, useDataContext: useAuctions } =
    createDataContext<Auction>(fetchAuctions, "Auctions");

export interface AuctionActions {
    placeBid: (auctionId: string, amount: number) => Promise<void>;
    updateAuction: (auctionId: string, data: Partial<Auction>) => Promise<void>;
}

export interface AuctionsContextType {
    state: DataState<Auction>;
    dispatch: React.Dispatch<DataAction<Auction>>;
    load: () => void;
    placeBid: (auctionId: string, amount: number) => Promise<void>;
}

export const useAuctionsActions  = (): AuctionsContextType & AuctionActions => {
    const context = useAuctions();
    const token = localStorage.getItem("token");

    if (!context) throw new Error("useAuctionsActions must be used within AuctionsProvider");

    const placeBid = async (auctionId: string, amount: number) => {
        const res = await fetch(`${API_BASE}/auctions/${auctionId}/bid`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                ...(token ? { Authorization: `Bearer ${token}` } : {}),
            },
            body: JSON.stringify(amount),
        });

        await handleApiResponse(res, "Failed to place bid");

        const updatedItems = context.state.items.map(a =>
            a.id === auctionId ? { ...a, highestBid: amount, bidCount: a.bidCount+1 } : a
        );
        context.dispatch({ type: "SET_ITEMS", payload: updatedItems });
    };

    const updateAuction = async (auctionId: string, data: Partial<Auction>) => {
        const res = await fetch(`${API_BASE}/auctions/${auctionId}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                ...(token ? { Authorization: `Bearer ${token}` } : {}),
            },
            body: JSON.stringify(data),
        });

        await handleApiResponse(res, "Failed to update auction");

        const updatedItems = context.state.items.map(a => (a.id === auctionId ? { ...a, ...data } : a));
        context.dispatch({ type: "SET_ITEMS", payload: updatedItems });
    };

    return { ...context, placeBid, updateAuction };
};