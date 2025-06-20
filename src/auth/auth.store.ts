import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { UserData } from './auth.types';

/**
 * Token already comes with user data
 */
export type AuthState = {
  accessToken: string | null;
  user: UserData | null;
};

export type AuthActions = {
  setToken: (token: string | null) => void;
  setUser: (user: AuthState['user']) => void;
  logout: () => void;
};

export type AuthStore = AuthState & AuthActions;

export const useAuthStore = create<AuthStore>()(
  persist(
    (set) => ({
      accessToken: null,
      user: null,

      setToken: (token) => set({ accessToken: token }),
      setUser: (user) => set({ user }),
      logout: () => set({ accessToken: null, user: null }),
    }),
    {
      name: 'auth-state',
    }
  )
);
