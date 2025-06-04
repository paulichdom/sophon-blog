import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { logoutUser } from './auth.api';
import { UserData } from './auth.types';

type AuthState = {
  user: UserData | null;
  accessToken: string | null;
};

type AuthActions = {
  setAuth: (user: UserData) => void;
  logout: () => void;
};

type AuthStore = AuthState & AuthActions;

export const useAuthStore = create<AuthStore>()(
  persist(
    (set) => ({
      user: null,
      accessToken: null,
      setAuth: (user) => set({ user, accessToken: user.token }),
      logout: async () => {
        await logoutUser();
        set({ user: null, accessToken: null });
        localStorage.removeItem('access-token');
      },
    }),
    {
      name: 'access-token',
      partialize: (state) => ({ accessToken: state.accessToken }),
    }
  )
);
