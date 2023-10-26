'use client'

import React, { ReactNode } from 'react';
import { Provider } from 'react-redux';
import store from '../redux/store';
import CheckAuth from '@/utils/checkAuth';

interface ReduxPageWrapperProps {
  children: ReactNode;
}

export const ReduxPageWrapper: React.FC<ReduxPageWrapperProps> = ({ children }) => {
  return (
    <Provider store={store}>
      <CheckAuth />
      {children}
    </Provider>
  );
};
