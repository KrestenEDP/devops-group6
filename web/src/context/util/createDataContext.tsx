import React, { createContext, useContext, useReducer } from "react";

export interface DataState<T> {
    items: T[];
    loading: boolean;
    error: string | null;
    loaded: boolean;
}

export type DataAction<T> =
    | { type: "SET_ITEMS"; payload: T[] }
    | { type: "SET_LOADING"; payload: boolean }
    | { type: "SET_ERROR"; payload: string | null }
    | { type: "SET_LOADED"; payload: boolean };


export function createDataContext<T>(apiFetch: () => Promise<T[]>, name: string) {
    const Context = createContext<{
        state: DataState<T>;
        dispatch: React.Dispatch<DataAction<T>>;
        load: () => void;
    } | undefined>(undefined);

    const initialState: DataState<T> = {
        items: [],
        loading: false,
        error: null,
        loaded: false
    };

    const reducer = (state: DataState<T>, action: DataAction<T>): DataState<T> => {
        switch (action.type) {
            case "SET_ITEMS": return { ...state, items: action.payload, loading: false, error: null, loaded: true };
            case "SET_LOADING": return { ...state, loading: action.payload };
            case "SET_ERROR": return { ...state, error: action.payload, loading: false, loaded: false };
            case "SET_LOADED": return { ...state, loaded: action.payload };
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

        const load = () => {
            if (state.items.length === 0 && !state.loading && !state.error && !state.loaded) {
                fetchData();
            }
        };

        return <Context.Provider value={{ state, dispatch, load }}>{children}</Context.Provider>;
    };

    const useDataContext = () => {
        const context = useContext(Context);
        if (!context) throw new Error(`${name}Context must be used within ${name}Provider`);
        return context;
    };

    return { Provider, useDataContext };
}
