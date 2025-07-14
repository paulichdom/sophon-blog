import { API_URL } from '@/shared/api.config';
import fetch from '@/shared/client';
import { UpdateUserDto } from '@/types/types';

export const updateUser = async (input: UpdateUserDto, userId: string) => {
  const response = await fetch(`${API_URL}/users/${userId}`, {
    method: 'PATCH',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(input),
  });

  if (response.satusCode === 404) {
    throw new Error('Updating user failed. PLease try again or contact your admin');
  }

  const data = await response;

  return data.user;
};
