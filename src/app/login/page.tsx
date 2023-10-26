import React from 'react';
import { LoginForm } from '../../components';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Login page',
};

const LoginPage = () => {
  return (
    <main>
      <LoginForm />
    </main>
  );
};

export default LoginPage;