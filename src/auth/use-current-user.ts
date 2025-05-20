import { useQuery } from '@tanstack/react-query';
import { currentUserQueryOptions } from './auth.queries';

export const useCurrentUser = () => useQuery(currentUserQueryOptions);
