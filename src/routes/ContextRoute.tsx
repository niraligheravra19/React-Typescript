import React, { useEffect } from "react";
import CommonForm from "../components/CommonForm";
import DataTable from "../components/DataTable";
import FilterComponent from "../components/FilterComponent";
import { useDataContext } from "../contexts/DataContext";
import { Data } from "../types/dataTypes"

const ContextRoute: React.FC = () => {
    const { state, dispatch } = useDataContext();

    useEffect(() => {
        dispatch({ type: "SET_FILTERED_DATA", payload: state.data });
    }, [state.data, dispatch]);

    const handleSave = (data: Data) => {
        if (data.id) {
            dispatch({ type: "UPDATE", payload: data });
        } else {
            const newId = state.data.length
                ? Math.max(...state.data.map((d) => d.id)) + 1
                : 1;
            dispatch({ type: "ADD", payload: { ...data, id: newId } });
        }
        dispatch({ type: "CLEAR_SELECTION" });
    };

    const handleDelete = (id: number) => {
        dispatch({ type: "DELETE", payload: { id } });
    };

    const handleSelectDelete = () => {
        if (state.selectedId !== null) {
            handleDelete(state.selectedId);
            dispatch({ type: "CLEAR_SELECTION" });
        }
    };

    const uniqueValues = state.field
    ? Array.from(
          new Set(
              state.data.map((item) => String(item[state.field as keyof Data]) || "")
          )
      )
    : [];

    return (
        <div>
            <h2>Context </h2>
            <CommonForm
                onSave={handleSave}
                selectedData={
                    state.data.find((item) => item.id === state.selectedId) || null
                }
                onClearSelection={() => dispatch({ type: "CLEAR_SELECTION" })}
            />

            <div>
                <label>Select ID:</label>
                <select
                    value={state.selectedId || ""}
                    onChange={(e) =>
                        dispatch({ type: "SET_SELECTED_ID", payload: Number(e.target.value) })
                    }
                >
                    <option value="">Select ID</option>
                    {state.data.map((item) => (
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
                onFieldChange={(field) =>
                    dispatch({ type: "SET_FIELD", payload: field as keyof Data | "" })
                }
                onValueChange={(value) =>
                    dispatch({ type: "SET_VALUE", payload: value })
                }
                onFilter={() => {
                    if (state.field && state.value) {
                        const filtered = state.data.filter(
                            (item) =>
                                String(item[state.field as keyof Data]) === state.value
                        );
                        dispatch({ type: "SET_FILTERED_DATA", payload: filtered });
                    }
                }}
                onShowAll={() =>
                    dispatch({ type: "SET_FILTERED_DATA", payload: state.data })
                }
            />
            <br />
            <DataTable
                data={state.filteredData}
                onEdit={(id) => dispatch({ type: "SET_SELECTED_ID", payload: id })}
                onDelete={handleDelete}
            />
        </div>
    );
};

export default ContextRoute;

