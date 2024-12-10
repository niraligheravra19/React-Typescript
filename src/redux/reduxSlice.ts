import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Data } from "../types/dataTypes";

interface DataState {
  data: Data[];
  selectedId: number | null;
  field: string;
  value: string;
  filteredData: Data[];
}

const initialState: DataState = {
  data: [],
  selectedId: null,
  field: "",
  value: "",
  filteredData: [],
};

const ReduxSlice = createSlice({
  name: "data",
  initialState,
  reducers: {
    addData(state, action: PayloadAction<Data>) {
      state.data.push(action.payload);
      state.filteredData = state.data;
    },
    updateData(state, action: PayloadAction<Data>) {
      const index = state.data.findIndex(
        (item) => item.id === action.payload.id
      );
      if (index !== -1) {
        state.data[index] = action.payload;
      }
      state.filteredData = state.data;
    },
    deleteData(state, action: PayloadAction<number>) {
      state.data = state.data.filter((item) => item.id !== action.payload);
      state.filteredData = state.data;
      if (state.selectedId === action.payload) {
        state.selectedId = null;
      }
    },
    setSelectedId(state, action: PayloadAction<number | null>) {
      state.selectedId = action.payload;
    },
    setField(state, action: PayloadAction<string>) {
      state.field = action.payload;
    },
    setValue(state, action: PayloadAction<string>) {
      state.value = action.payload;
    },
    filterData(state) {
      if (state.field && state.value) {
        state.filteredData = state.data.filter(
          (item) => String((item as any)[state.field]) === state.value
        );
      } else {
        state.filteredData = state.data;
      }
    },
    resetFilter(state) {
      state.filteredData = state.data;
    },
  },
});

export const {
  addData,
  updateData,
  deleteData,
  setSelectedId,
  setField,
  setValue,
  filterData,
  resetFilter,
} = ReduxSlice.actions;
export default ReduxSlice.reducer;


