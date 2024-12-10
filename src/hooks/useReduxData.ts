import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../redux/store";
import { addData, updateData, deleteData } from "../redux/reduxSlice";
import { Data } from "../types/dataTypes";

export const useReduxData = () => {
  const dispatch = useDispatch();
  const data = useSelector((state: RootState) => state.data.data);
  const selectedId = useSelector((state: RootState) => state.data.selectedId);
  const field = useSelector((state: RootState) => state.data.field);
  const value = useSelector((state: RootState) => state.data.value);
  const filteredData = useSelector((state: RootState) => state.data.filteredData);

  const handleSave = (newData: Data) => {
    if (newData.id) {
      // If there's an id, update the existing data
      dispatch(updateData(newData));
    } else {
      // If no id, generate a new ID and add the new entry
      const newId = data.length ? Math.max(...data.map((item) => item.id)) + 1 : 1;
      dispatch(addData({ ...newData, id: newId })); // Ensure newId is added only if newData doesn't have an id
    }
  };
  
  const handleDelete = (id: number) => {
    dispatch(deleteData(id));
  };

  const handleSetSelectedId = (id: number | null) => {
    dispatch({ type: "data/setSelectedId", payload: id });
  };

  const handleSetField = (field: string) => {
    dispatch({ type: "data/setField", payload: field });
  };

  const handleSetValue = (value: string) => {
    dispatch({ type: "data/setValue", payload: value });
  };

  const handleFilterData = () => {
    dispatch({ type: "data/filterData" });
  };

  const handleResetFilter = () => {
    dispatch({ type: "data/resetFilter" });
  };

  return {
    data,
    selectedId,
    field,
    value,
    filteredData,
    handleSave,
    handleDelete,
    handleSetSelectedId,
    handleSetField,
    handleSetValue,
    handleFilterData,
    handleResetFilter,
  };
};


