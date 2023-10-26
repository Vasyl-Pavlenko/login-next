"use client"

import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../redux/types';
import { useRouter } from 'next/router';
import CheckAuth from '@/utils/checkAuth';

const withAuth = <P extends Record<string, unknown>>(WrappedComponent: React.ComponentType<P>) => {
  const WithAuth: React.FC<P> = (props: P) => {
    const isLoggedIn = useSelector((state: RootState) => state.auth.user !== null);
    const router = useRouter();

    useEffect(() => {
      if (isLoggedIn) {
        router.push('/table');
      }
    }, [isLoggedIn, router]);

    return (
      <>
        <CheckAuth />
        <WrappedComponent {...props} />
      </>
    );
  };

  return WithAuth;
};

export default withAuth;
