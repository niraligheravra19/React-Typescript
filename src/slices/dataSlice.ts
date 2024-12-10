// src/slices/dataSlice.ts
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Data } from '../types/dataTypes';

interface DataState {
  data: Data[];
}

const initialState: DataState = {
  data: [],
};

const dataSlice = createSlice({
  name: 'data',
  initialState,
  reducers: {
    addData: (state, action: PayloadAction<Data>) => {
      state.data.push(action.payload);
    },
    updateData: (state, action: PayloadAction<Data>) => {
      const index = state.data.findIndex(item => item.id === action.payload.id);
      if (index !== -1) {
        state.data[index] = action.payload;
      }
    },
    deleteData: (state, action: PayloadAction<number>) => {
      state.data = state.data.filter(item => item.id !== action.payload);
    },
  },
});

export const { addData, updateData, deleteData } = dataSlice.actions;
export default dataSlice.reducer;
