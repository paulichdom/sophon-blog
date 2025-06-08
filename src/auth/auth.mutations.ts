import { loginUser, registerUser } from './auth.api';
import { useAuthStore } from './auth.store';
import { UserData, UserDto } from './auth.types';

export const loginMutationOptions = () => ({
  mutationFn: loginUser,
  onSuccess: (user: UserData) => {
    useAuthStore.getState().handleAuthSuccess(user);
  },
});

export const registerMutationOptions = () => ({
  mutationFn: registerUser,
  onSuccess: (user: UserData) => {
    useAuthStore.getState().handleAuthSuccess(user);
  },
});
