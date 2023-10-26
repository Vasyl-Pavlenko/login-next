"use client"

import React from 'react';
import Link from 'next/link';
import { Button, Container } from 'react-bootstrap';
import { useSelector } from 'react-redux';
import { RootState } from '../redux/types';

export const Home: React.FC = () => {
  const isLoggedIn = useSelector((state: RootState) => state.auth.isLoggedIn);

  return (
    <div>
      <Container className="text-center mt-5">
        <h1 className="display-4">
          Welcome to the our application
        </h1>

        <p className="lead">
          {`Please click the button below to ${isLoggedIn ? 'open the table' : 'login'}:`}
        </p>

        {isLoggedIn ? (
          <Link href="/table">
            <Button
              variant="primary"
              size="lg"
            >
              Table
            </Button>
          </Link>
        ) : (
          <Link href="/login">
            <Button
              variant="primary"
              size="lg"
            >
              Login
            </Button>
          </Link>
        )}
      </Container>
    </div>
  );
};
