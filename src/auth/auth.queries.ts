import { queryOptions } from '@tanstack/react-query';
import { currentUser } from './auth.api';
import { useAuthStore } from './auth.store';

export const currentUserQueryOptions = queryOptions({
  queryKey: ['me'],
  queryFn: () => currentUser(),
  enabled: !!useAuthStore.getState().accessToken,
});
