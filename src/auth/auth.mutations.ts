import { loginUser, registerUser } from './auth.api';

export const loginMutationOptions = () => ({
  mutationFn: loginUser,
});

export const registerMutationOptions = () => ({
  mutationFn: registerUser,
});

