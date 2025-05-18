import { AuthAction } from '@/auth/use-auth-store';
import { NavigateFn } from '@tanstack/react-router';
import { loginUser } from './user.api';
import { UserData } from './user.types';

export const loginMutationOptions = (navigate: NavigateFn, setUser: AuthAction['setUser']) => ({
  mutationFn: loginUser,
  onSuccess: (user: UserData) => {
    setUser(user);
    navigate({ to: '/' });
  },
});
