import React, { useState, useEffect } from "react";
import CommonForm from "../components/CommonForm";
import DataTable from "../components/DataTable";
import FilterComponent from "../components/FilterComponent";
import { Data } from "../types/dataTypes";

interface StateRouteProps {
    data: Data[];
    onAddOrUpdate: (data: Data) => void;
    onDelete: (id: number) => void;
}

const StateRoute: React.FC<StateRouteProps> = ({
    data,
    onAddOrUpdate,
    onDelete,
}) => {
    const [selectedId, setSelectedId] = useState<number | null>(null);
    const [field, setField] = useState<keyof Data | "">("");
    const [value, setValue] = useState<string>("");
    const [filteredData, setFilteredData] = useState<Data[]>(data);

    useEffect(() => {
        setFilteredData(data);
    }, [data]);

    const handleSave = (data: Data) => {
        onAddOrUpdate(data);
        setSelectedId(null);
    };

    const handleSelectDelete = () => {
        if (selectedId !== null) {
            onDelete(selectedId);
            setSelectedId(null);
        }
    };

    const uniqueValues = field
        ? Array.from(new Set(data.map((item) => String(item[field]) || "")))
        : [];

    return (
        <div>
            <h2>State </h2>
            <CommonForm
                onSave={handleSave}
                selectedData={
                    data.find((item) => item.id === selectedId) || null
                }
                onClearSelection={() => setSelectedId(null)}
            />
            <div>
                <label>Select ID:</label>
                <select
                    value={selectedId || ""}
                    onChange={(e) => setSelectedId(Number(e.target.value))}
                >
                    <option value="">Select ID</option>
                    {data.map((item) => (
                        <option key={item.id} value={item.id}>
                            {item.id}
                        </option>
                    ))}
                </select>
                <button onClick={handleSelectDelete}>Delete</button>
            </div>
            <br />
            <FilterComponent
                fields={["name", "city", "age"]}
                uniqueValues={uniqueValues}
                onFieldChange={(field) => setField(field as keyof Data | "")}
                onValueChange={setValue}
                onFilter={() => {
                    if (field && value) {
                        setFilteredData(
                            data.filter(
                                (item) =>
                                    String(item[field as keyof Data]) === value
                            )
                        );
                    }
                }}
                onShowAll={() => setFilteredData(data)}
            />
            <br />
            <DataTable
                data={filteredData}
                onEdit={(id) => setSelectedId(id)}
                onDelete={onDelete}
            />
        </div>
    );
};

export default StateRoute;
