import { NavigateFn } from '@tanstack/react-router';
import { loginUser } from './auth.api';
import { UserData } from './auth.types';
import { AuthAction } from './use-auth-store';

export const loginMutationOptions = (navigate: NavigateFn, setUser: AuthAction['setUser']) => ({
  mutationFn: loginUser,
  onSuccess: (user: UserData) => {
    setUser(user);
    navigate({ to: '/' });
  },
});
