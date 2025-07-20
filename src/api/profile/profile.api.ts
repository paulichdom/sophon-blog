import { API_URL } from '@/shared/api.config';
import fetch from '@/shared/client';
import { ProfileData, ProfileDto, UpdateProfileDto } from '@/types/types';

export const fetchUserProfile = async (username: string) => {
  const url = new URL(`${API_URL}/profiles/${username}`);
  const profile: ProfileDto = await fetch(url.toString(), {
    credentials: 'include',
  });

  return profile;
};

export const followUserProfile = async (username: string) => {
  const url = new URL(`${API_URL}/profiles/${username}/follow`);
  const profile: ProfileDto = await fetch(url.toString(), {
    method: 'POST',
    credentials: 'include',
  });

  return profile;
};

export const unfollowUserProfile = async (username: string) => {
  const url = new URL(`${API_URL}/profiles/${username}/follow`);
  const profile: ProfileDto = await fetch(url.toString(), {
    method: 'DELETE',
    credentials: 'include',
  });

  return profile;
};

export const updateUserProfile = async (updateProfileDto: UpdateProfileDto) => {
  const url = new URL(`${API_URL}/profiles/edit`);
  const profile: Partial<ProfileData> = await fetch(url.toString(), {
    method: 'PATCH',
    credentials: 'include',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(updateProfileDto),
  });

  return profile;
};
