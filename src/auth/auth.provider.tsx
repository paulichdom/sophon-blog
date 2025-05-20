import { createContext, ReactNode, useContext } from 'react';
import { queryClient } from '@/queryClient';
import { loginUser, logoutUser, registerUser } from './auth.api';
import { LoginUserDto, RegisterUserDto } from './auth.types';
import { useCurrentUser } from './use-current-user';

interface AuthContextType {
  user: any;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (credentials: LoginUserDto) => Promise<void>;
  logout: () => Promise<void>;
  register: (input: RegisterUserDto) => Promise<void>;
}

const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const { data, isLoading } = useCurrentUser();

  const login = async (credentials: LoginUserDto) => {
    await loginUser(credentials);
    await queryClient.invalidateQueries({ queryKey: ['me'] });
  };

  const logout = async () => {
    await logoutUser();
    await queryClient.invalidateQueries({ queryKey: ['me'] });
  };

  const register = async (input: RegisterUserDto) => {
    await registerUser(input);

    // Optionally: wait for user to be available
    await queryClient.invalidateQueries({ queryKey: ['me'] });
  };

  return (
    <AuthContext.Provider
      value={{
        user: data?.user ?? null,
        isAuthenticated: !!data?.user,
        isLoading,
        login,
        logout,
        register,
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
