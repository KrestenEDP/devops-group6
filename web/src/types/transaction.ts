import type {Auction} from "@customTypes/auction.ts";

export type Transaction = {
    amount: number;
    date: string; // ISO date string
    auction: Auction;
};