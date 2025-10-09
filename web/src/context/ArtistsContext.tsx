// src/context/ArtistsContext.tsx
import React, { createContext, useContext, useReducer } from "react";
import type {Artist} from "@customTypes/artist";

type State = { artists: Artist[] };
type Action = { type: "SET_ARTISTS"; payload: Artist[] };

const initialState: State = { artists: [] };

const ArtistsContext = createContext<{ state: State; dispatch: React.Dispatch<Action> } | undefined>(undefined);

function reducer(state: State, action: Action): State {
    switch (action.type) {
        case "SET_ARTISTS":
            return { ...state, artists: action.payload };
        default:
            return state;
    }
}

export const ArtistsProvider = ({ children }: { children: React.ReactNode }) => {
    const [state, dispatch] = useReducer(reducer, initialState);
    return <ArtistsContext.Provider value={{ state, dispatch }}>{children}</ArtistsContext.Provider>;
};

export const useArtistsContext = () => {
    const context = useContext(ArtistsContext);
    if (!context) throw new Error("useArtistsContext must be used within ArtistsProvider");
    return context;
};
