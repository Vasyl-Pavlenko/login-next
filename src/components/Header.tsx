"use client"

import React from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../redux/slices/authSlice';
import { RootState } from '../redux/types';
import { Navbar, Nav, Button } from 'react-bootstrap';

export const Header = () => {
  const isLoggedIn = useSelector((state: RootState) => state.auth.isLoggedIn);
  const dispatch = useDispatch();
  const router = useRouter();

  const handleLogout = () => {
    localStorage.removeItem('isLoggedIn');
    dispatch(logout());
    router.push('/');
  };

  return (
    <header>
      <Navbar
        bg="primary"
        expand="lg"
        className="d-flex px-5"
      >
        <Navbar.Brand>
          <Link
            href="/"
            className='text-white text-decoration-none'
          >
            Home Page
          </Link>
        </Navbar.Brand>

        <Navbar.Collapse
          id="basic-navbar-nav"
          className="justify-content-end"
        >
          <Nav className="ml-auto ">
            {isLoggedIn ? (
              <Button
                variant="primary"
                onClick={handleLogout}
                className='text-white text-decoration-none'
              >
                Log out
              </Button>
            ) : (
                <Link
                  href="/login"
                  className='text-white text-decoration-none'
                >
                Log in
              </Link>
            )}
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    </header>
  );
};
