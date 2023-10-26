import { createSlice } from '@reduxjs/toolkit';
import { addObject, fetchData, updateData,  } from '../actions';
import { TableItem } from '@/redux/types';
import { loadDataFromLocalStorage } from '@/utils';

interface TableState {
  items: TableItem[];
  isLoading: boolean;
  totalPages: number;
  currentPage: number;
}

const initialState: TableState = {
  items: loadDataFromLocalStorage('items') || [],
  isLoading: false,
  totalPages: 0,
  currentPage: 1,
};

const tableSlice = createSlice({
  name: 'table',
  initialState,
  reducers: {
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchData.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchData.fulfilled, (state, action) => {
        state.isLoading = false;
        state.items = action.payload.results;
        state.totalPages = Math.ceil(action.payload.count / 10);
        const nextPage = action.payload.next;
        if (nextPage) {
          const offsetParam = new URL(nextPage).searchParams.get('offset');
          state.currentPage = offsetParam ? (parseInt(offsetParam, 10) / 10) + 1 : 1;
        }
        const prevPage = action.payload.previous;
        if (prevPage) {
          const offsetParam = new URL(prevPage).searchParams.get('offset');
          state.currentPage = offsetParam ? (parseInt(offsetParam, 10) / 10) + 1 : 1;
        }
      })
      .addCase(fetchData.rejected, (state) => {
        state.isLoading = false;
      })
      .addCase(updateData.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(updateData.fulfilled, (state) => {
        state.isLoading = false;
      })
      .addCase(updateData.rejected, (state) => {
        state.isLoading = false;
      })
      .addCase(addObject.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(addObject.fulfilled, (state, action) => {
        state.isLoading = false;
        state.items = [...state.items, action.payload];
      })
      .addCase(addObject.rejected, (state) => {
        state.isLoading = false;
      });
  },
});

export default tableSlice.reducer;
