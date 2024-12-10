import { useContext } from "react";
import { DataContext } from "../contexts/DataContext";

export const useContextData = () => {
    const context = useContext(DataContext);
    if (!context) {
        throw new Error("useContextData must be used within a DataProvider");
    }
    return context;
};