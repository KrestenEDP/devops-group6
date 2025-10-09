// context/AuctionsContext.tsx
import React, { createContext, useContext, useState, type ReactNode } from "react";
import type {Auction} from "@customTypes/auction.ts";

interface AuctionsContextProps {
    auctions: Auction[];
    setAuctions: React.Dispatch<React.SetStateAction<Auction[]>>;
}

const AuctionsContext = createContext<AuctionsContextProps | undefined>(undefined);

export const AuctionsProvider = ({ children }: { children: ReactNode }) => {
    const [auctions, setAuctions] = useState<Auction[]>([]);

    return (
        <AuctionsContext.Provider value={{ auctions, setAuctions }}>
            {children}
        </AuctionsContext.Provider>
    );
};

export const useAuctions = () => {
    const context = useContext(AuctionsContext);
    if (!context) throw new Error("useAuctions must be used within AuctionsProvider");
    return context;
};
