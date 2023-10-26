import { configureStore } from '@reduxjs/toolkit';
import thunk from 'redux-thunk';
import { useDispatch } from 'react-redux';
import authSlice from './slices/authSlice';
import tableSlice from './slices/tableSlice';
import { AppDispatch } from './types';


const store = configureStore({
  reducer: {
    auth: authSlice,
    table: tableSlice,
  },
  middleware: [thunk],
});

export default store;
export const useAppDispatch = () => useDispatch<AppDispatch>();