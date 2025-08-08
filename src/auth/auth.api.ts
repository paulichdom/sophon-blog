import { API_URL } from '@/shared/api.config';
import fetch from '@/shared/client';
import { LoginUserDto, RegisterUserDto, UserData } from './auth.types';

export const registerUser = async (input: RegisterUserDto) => {
  const response = await fetch(`${API_URL}/users/register`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(input),
  });

  if (response.statusCode === 400) {
    if (response.message === 'Email in use') {
      throw new Error('Email already in use');
    }

    throw new Error('Registration failed, please try again');
  }

  const data = await response;

  return data.user;
};

export const loginUser = async (input: LoginUserDto): Promise<UserData> => {
  const response = await fetch(`${API_URL}/users/login`, {
    method: 'POST',
    credentials: 'include',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(input),
  });

  if (response.statusCode === 404 || response.statusCode === 400) {
    throw new Error('Invalid credentials');
  }

  return response.user;
};

export const currentUser = async () => {
  const response = await fetch(`${API_URL}/users/whoami`, {
    credentials: 'include',
    headers: { 'Content-Type': 'application/json' },
  });

  return response.user;
};

export const logoutUser = async (): Promise<void> => {
  await fetch(`${API_URL}/users/logout`, {
    method: 'POST',
    credentials: 'include',
    headers: { 'Content-Type': 'application/json' },
  });
};
