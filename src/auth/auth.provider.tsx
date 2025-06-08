import { createContext, ReactNode, useContext, useEffect } from 'react';
import { UseMutateFunction, useMutation, useQueryClient } from '@tanstack/react-query';
import { loginMutationOptions, registerMutationOptions } from './auth.mutations';
import { useAuthStore } from './auth.store';
import { LoginUserDto, RegisterUserDto, UserData } from './auth.types';

interface AuthContextType {
  user: any;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: UseMutateFunction<UserData, Error, LoginUserDto, unknown>;
  register: UseMutateFunction<UserData, Error, RegisterUserDto, unknown>;
  logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const { mutate: loginUser, isPending: loginUserPending } = useMutation(loginMutationOptions());
  const { mutate: registerUser, isPending: registerUserPending } =
    useMutation(registerMutationOptions());
  const { user, isAuthenticated, isLoading, validateToken, logout } = useAuthStore();

  useEffect(() => {
    validateToken();
  }, []);

  return (
    <AuthContext.Provider
      value={{
        user: user ?? null,
        isAuthenticated: !!user,
        isLoading,
        login: loginUser,
        register: registerUser,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuthContext = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuthContext must be used within AuthProvider');
  return ctx;
};
