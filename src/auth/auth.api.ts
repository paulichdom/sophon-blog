import { API_URL } from '@/shared/api.config';
import fetch from '@/shared/client';
import { LoginUserDto, RegisterUserDto } from './auth.types';

export const registerUser = async (input: RegisterUserDto) => {
  const response = await fetch(`${API_URL}/users/register`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(input),
  });

  const data = await response.json();

  return data.user;
};

export const loginUser = async (input: LoginUserDto) => {
  const response = await fetch(`${API_URL}/users/login`, {
    method: 'POST',
    credentials: 'include',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(input),
  });

  if (response.statusCode === 404 || response.statusCode === 400)
    throw new Error('Invalid credentials');

  return response.user;
};

export const currentUser = async () => {
  const response = await fetch(`${API_URL}/users/whoami`, {
    credentials: 'include',
    headers: { 'Content-Type': 'application/json' },
  });

  return response.user;
};

export const logoutUser = async () => {
  const response = await fetch(`${API_URL}/users/logout`, {
    method: 'POST',
    credentials: 'include',
    headers: { 'Content-Type': 'application/json' },
  });

  const data = await response.json();

  return data.user;
};
