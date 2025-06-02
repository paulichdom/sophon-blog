import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { LoginUserDto, RegisterUserDto, UserData } from './auth.types';

type AuthState = {
  user: UserData | null;
  accessToken: string | null;

  login: (credentials: LoginUserDto) => Promise<void>;
  logout: () => void;
  register: (credentials: RegisterUserDto) => Promise<void>;
};

// TODO: implement methods
export const useAuthStore = create<AuthState>()(
  persist(
    (set, get) => ({
      user: null,
      accessToken: null,
      login: () => new Promise(() => {}),
      logout: () => {},
      register: async () => new Promise(() => {}),
    }),
    {
      name: 'auth-store',
      partialize: (state) => ({ accessToken: state.accessToken }),
    }
  )
);
