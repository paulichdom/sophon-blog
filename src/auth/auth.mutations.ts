import { loginUser, logoutUser, registerUser } from './auth.api';
import { useAuthStore } from './auth.store';
import { UserData } from './auth.types';

export const loginMutationOptions = () => ({
  mutationFn: loginUser,
  onSuccess: (user: UserData) => {
    useAuthStore.getState().setToken(user.token ?? null);
    useAuthStore.getState().setUser(user);
  },
});

export const logoutMutationOptions = () => ({
  mutationFn: logoutUser,
  onSuccess: () => {
    useAuthStore.getState().logout();
  },
});

export const registerMutationOptions = () => ({
  mutationFn: registerUser,
});

