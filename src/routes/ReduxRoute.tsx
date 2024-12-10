import React, { useEffect } from "react";
import CommonForm from "../components/CommonForm";
import DataTable from "../components/DataTable";
import FilterComponent from "../components/FilterComponent";
import { useReduxData } from "../hooks/useReduxData";


const ReduxRoute = () => {
  const {
    data,
    selectedId,
    field,
   
    filteredData,
    handleSave,
    handleDelete,
    handleSetSelectedId,
    handleSetField,
    handleSetValue,
    handleFilterData,
    handleResetFilter,
  } = useReduxData();

  useEffect(() => {
    if (selectedId !== null) {
      const selectedItem = data.find((item) => item.id === selectedId);
      if (selectedItem) {
        handleSetField("name"); 
        handleSetValue(String(selectedItem.name)); 
      }
    }
  }, [selectedId, data, handleSetField, handleSetValue]);

 
  const uniqueValues = field
    ? Array.from(new Set(data.map((item) => String((item as any)[field]) || "")))
    : [];

  return (
    <div>
      <h2>Redux</h2>
      <CommonForm
        onSave={handleSave} 
        selectedData={data.find((item) => item.id === selectedId) || null} 
        onClearSelection={() => handleSetSelectedId(null)} 
      />
      <div>
        <label>Select ID:</label>
        <select
          value={selectedId || ""}
          onChange={(e) => handleSetSelectedId(Number(e.target.value) || null)} 
        >
          <option value="">Select ID</option>
          {data.map((item) => (
            <option key={item.id} value={item.id}>
              {item.id}
            </option>
          ))}
        </select>
        <button onClick={() => selectedId && handleDelete(selectedId)}>
          Delete
        </button>
      </div>
      <br />
      <FilterComponent
        fields={["name", "city", "age"]}
        uniqueValues={uniqueValues}
        onFieldChange={handleSetField}
        onValueChange={handleSetValue}
        onFilter={handleFilterData}
        onShowAll={handleResetFilter}
      />
      <br />
      <DataTable
        data={filteredData} 
        onEdit={(id) => handleSetSelectedId(id)} 
        onDelete={handleDelete} 
      />
    </div>
  );
};

export default ReduxRoute;


