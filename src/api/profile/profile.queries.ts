import { queryOptions } from '@tanstack/react-query';
import { fetchUserProfile } from './profile.api';

export const userProfileQueryOptions = (username: string) =>
  queryOptions({
    queryKey: ['profile', { username }],
    queryFn: () => fetchUserProfile(username),
  });
