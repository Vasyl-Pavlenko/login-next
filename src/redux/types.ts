import { Action, ThunkAction } from "@reduxjs/toolkit";
import store from "./store";
import { loginAction } from './actions';

export type RootAction = Action | ReturnType<typeof loginAction.fulfilled> | ReturnType<typeof loginAction.rejected>;

export type RootState = {
  auth: AuthState; 
  table: TableState;  
};

export type AuthState = {
  username: string;
  password: string;
  user: User | null;
  error: boolean;
  isLoggedIn: boolean;
};

export type TableState = {
  items: TableItem[];
  isLoading: boolean;
  totalPages: number;
  currentPage: number;
  search: string;
  editedData: Record<number, Record<string, string>>;
  count: number;
};

export type TableItem = {
  id: number;
  name: string;
  email: string;
  birthday_date: string;
  phone_number: string;
  address: string;
  [key: string]: string | number;
};

export type LoginAction =
  | {
    type: 'LOGIN_SUCCESS';
    payload: User;
  }
  | {
    type: 'LOGIN_FAILURE';
    error: string;
  };

export type DataAction = {
  type: 'FETCH_DATA',
  payload: Data[]
} | {
  type: 'UPDATE_DATA',
  id: number,
  field: string,
  value: any
};

export type Data = {
  id: number;
  name: string;
  email: string;
  birthday_date: string;
  phone_number: string;
  address: string;
};

export type DataResponse = {
  count: number;
  next: string | null;
  previous: string | null;
  results: Data[];
};

export type User = {
  username: string;
  password: string;
};

export type DataState = {
  data: Data[];
};

export type Record<K extends string | number | symbol, T> = {
  [P in K]: T;
};


export type AppDispatch = typeof store.dispatch;

export type AppThunk = ThunkAction<void, RootState, null, Action<string>>;
