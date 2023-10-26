import { getIsLoggedIn } from '@/utils';
import { createSlice } from '@reduxjs/toolkit';

const isLoggedIn = getIsLoggedIn();

const initialAuthState = {
  username: '',
  password: '',
  user: null,
  error: null,
  isLoggedIn,
};

const authSlice = createSlice({
  name: 'auth',
  initialState: initialAuthState,
  reducers: {
    loginSuccess: (state, { payload: user }) => {
      state.user = user;
      state.error = null;
      state.isLoggedIn = true;
    },
    loginFailure: (state, { payload: error }) => {
      state.error = error;
      state.isLoggedIn = false;
    },
    logout: (state) => {
      state.user = null;
      state.error = null;
      state.isLoggedIn = false;
      localStorage.removeItem('isLoggedIn');
    },
  },
});

export const { loginSuccess, loginFailure, logout } = authSlice.actions;
export default authSlice.reducer;
