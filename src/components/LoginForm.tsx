"use client"

import { useState } from 'react';
import { useSelector } from 'react-redux';
import { useAppDispatch } from '../redux/store';
import { useRouter } from 'next/navigation';
import { Alert, Button, Form, Spinner } from 'react-bootstrap';
import { AppDispatch, RootState } from '@/redux/types';
import { loginSuccess } from '../redux/slices/authSlice';
import { loginAction } from '../redux/actions';

export const LoginForm: React.FC = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const authError = useSelector((state: RootState) => state.auth.error);
  const dispatch: AppDispatch = useAppDispatch();
  const router = useRouter();

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setError(false);
    setErrorMessage('');
    const { name, value } = e.target;
    if (name === 'username') {
      setUsername(value);
    } else if (name === 'password') {
      setPassword(value);
    }
    validateForm(username, password)
  };

  const validateForm = (newUsername: string, newPassword: string) => {
    if (newUsername.trim() === '' || newPassword.trim() === '') {
      setError(true);
      setErrorMessage("Both username and password are required.");
    } else {
      setError(false);
      setErrorMessage("");
    }
  };

  const handleLogin = async () => {
    setError(false);
    setErrorMessage('');
    setLoading(true);

    try {
      // @ts-ignore
      const response = await dispatch(loginAction({ username, password }));

      if (loginAction.fulfilled.match(response)) {
        localStorage.setItem('isLoggedIn', 'true');
        dispatch(loginSuccess({ username, password }));
        router.push('/table');
      } else if (loginAction.rejected.match(response)) {
        const error: any = response.error;
        setError(true);
        setErrorMessage(error.message);
      }
    } catch (error) {
      setError(true);
      setErrorMessage('Login error');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="d-flex justify-content-center align-items-center min-vh-100">
      <div className='bg-info rounded-3 p-4'>
        <h2>Log in</h2>

        {error && (
          <Alert variant='danger'>
            {errorMessage}
          </Alert>
        )}

        <Form>
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label className="text-muted">
              Username
            </Form.Label>

            <Form.Control
              type="text"
              name="username"
              placeholder="Enter your username"
              value={username}
              onChange={handleInputChange}
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Label className="text-muted">
              Password
            </Form.Label>

            <Form.Control
              type="password"
              name="password"
              placeholder="Enter your password"
              value={password}
              onChange={handleInputChange}
            />
          </Form.Group>

          <Button
            variant="primary"
            onClick={handleLogin}
            disabled={error || loading}
          >
            {loading ? (
              <Spinner
                as="span"
                animation="border"
                size="sm"
                role="status"
                aria-hidden="true"
              />
            ) : (
              'Log in'
            )}
          </Button>
        </Form>
      </div>
    </div>
  );
};
