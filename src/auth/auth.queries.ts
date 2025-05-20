import { queryOptions } from '@tanstack/react-query';
import { currentUser } from './auth.api';

export const currentUserQueryOptions = queryOptions({
  queryKey: ['me'],
  queryFn: () => currentUser(),
  retry: false,
});
