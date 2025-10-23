import React, { createContext, useContext, useReducer, useEffect } from "react";

export interface DataState<T> {
    items: T[];
    loading: boolean;
    error: string | null;
}

export type DataAction<T> =
    | { type: "SET_ITEMS"; payload: T[] }
    | { type: "SET_LOADING"; payload: boolean }
    | { type: "SET_ERROR"; payload: string | null };


export function createDataContext<T>(apiFetch: () => Promise<T[]>, name: string) {
    const Context = createContext<{ state: DataState<T>; dispatch: React.Dispatch<DataAction<T>> } | undefined>(undefined);

    const initialState: DataState<T> = { items: [], loading: false, error: null };

    const reducer = (state: DataState<T>, action: DataAction<T>): DataState<T> => {
        switch (action.type) {
            case "SET_ITEMS": return { ...state, items: action.payload, loading: false, error: null };
            case "SET_LOADING": return { ...state, loading: action.payload };
            case "SET_ERROR": return { ...state, error: action.payload, loading: false };
            default: return state;
        }
    };

    const Provider = ({ children }: { children: React.ReactNode }) => {
        const [state, dispatch] = useReducer(reducer, initialState);

        const fetchData = () => {
            dispatch({ type: "SET_LOADING", payload: true });
            apiFetch()
                .then((data) => dispatch({ type: "SET_ITEMS", payload: data }))
                .catch((err) => dispatch({ type: "SET_ERROR", payload: err.message || "Error fetching " + name }));
        }

        useEffect(() => {
            if (state.items.length === 0)
                fetchData();
        }, [state.items.length]);

        return <Context.Provider value={{ state, dispatch }}>{children}</Context.Provider>;
    };

    const useDataContext = () => {
        const context = useContext(Context);
        if (!context) throw new Error(`${name}Context must be used within ${name}Provider`);
        return context;
    };

    return { Provider, useDataContext };
}
