import { createDataContext } from "./createDataContext";
import {handleApiResponse} from "@context/handleApiResponse.ts";
import type {Transaction} from "@customTypes/transaction.ts";

const API_BASE = import.meta.env.VITE_API_URL;

const fetchTransactions = async (): Promise<Transaction[]> => {
    const token = localStorage.getItem("token");
    const res = await fetch(`${API_BASE}/transactions`, {
        headers: {
            "Content-Type": "application/json",
            ...(token ? { Authorization: `Bearer ${token}` } : {}),
        },
    });

    await handleApiResponse(res, "Failed to fetch transactions");
    return await res.json();
};

export const { Provider: TransactionsProvider, useDataContext: useTransactions } = createDataContext<Transaction>(fetchTransactions, "Transactions");
