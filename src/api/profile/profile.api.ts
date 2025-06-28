import { API_URL } from '@/shared/api.config';
import fetch from '@/shared/client';
import { ProfileDto } from '@/types/types';

export const fetchUserProfile = async (username: string) => {
  const url = new URL(`${API_URL}/profiles/${username}`);
  const profile: ProfileDto = await fetch(url.toString());

  return profile;
};
