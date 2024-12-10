import React, { createContext, useReducer, useContext } from "react";
import { Data } from "../types/dataTypes";

export interface DataState {
    data: Data[];
    filteredData: Data[];
    selectedId: number | null;
    field: keyof Data | "";
    value: string;
}

const initialState: DataState = {
    data: [],
    filteredData: [],
    selectedId: null,
    field: "",
    value: "",
};

export const ACTIONS = {
    ADD: "ADD",
    UPDATE: "UPDATE",
    DELETE: "DELETE",
    SET_SELECTED_ID: "SET_SELECTED_ID",
    SET_FIELD: "SET_FIELD",
    SET_VALUE: "SET_VALUE",
    SET_FILTERED_DATA: "SET_FILTERED_DATA",
    CLEAR_SELECTION: "CLEAR_SELECTION",
} as const;

type Action =
    | { type: "ADD"; payload: Data }
    | { type: "UPDATE"; payload: Data }
    | { type: "DELETE"; payload: { id: number } }
    | { type: "SET_SELECTED_ID"; payload: number | null }
    | { type: "SET_FIELD"; payload: keyof Data | "" }
    | { type: "SET_VALUE"; payload: string }
    | { type: "SET_FILTERED_DATA"; payload: Data[] }
    | { type: "CLEAR_SELECTION" };

const reducer = (state: DataState, action: Action): DataState => {
    switch (action.type) {
        case ACTIONS.ADD:
            return { ...state, data: [...state.data, action.payload] };
        case ACTIONS.UPDATE:
            return {
                ...state,
                data: state.data.map((item) =>
                    item.id === action.payload.id ? action.payload : item
                ),
            };
        case ACTIONS.DELETE:
            return {
                ...state,
                data: state.data.filter((item) => item.id !== action.payload.id),
                filteredData: state.filteredData.filter(
                    (item) => item.id !== action.payload.id
                ),
            };
        case ACTIONS.SET_SELECTED_ID:
            return { ...state, selectedId: action.payload };
        case ACTIONS.SET_FIELD:
            return { ...state, field: action.payload };
        case ACTIONS.SET_VALUE:
            return { ...state, value: action.payload };
        case ACTIONS.SET_FILTERED_DATA:
            return { ...state, filteredData: action.payload };
        case ACTIONS.CLEAR_SELECTION:
            return { ...state, selectedId: null, field: "", value: "" };
        default:
            return state;
    }
};

const DataContext = createContext<{
    state: DataState;
    dispatch: React.Dispatch<Action>;
} | null>(null);

export const useDataContext = () => {
    const context = useContext(DataContext);
    if (!context) {
        throw new Error("useDataContext must be used within a DataProvider");
    }
    return context;
};


export const DataProvider: React.FC<{ children: React.ReactNode }> = ({
    children,
}) => {
    const [state, dispatch] = useReducer(reducer, initialState);
    return (
        <DataContext.Provider value={{ state, dispatch }}>
            {children}
        </DataContext.Provider>
    );
};

export { DataContext };