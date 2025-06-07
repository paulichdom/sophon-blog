import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { currentUser, logoutUser } from './auth.api';
import { UserData } from './auth.types';

type AuthState = {
  user: UserData | null;
  accessToken: string | null;
  isAuthenticated: boolean;
  isLoading: boolean;
};

type AuthActions = {
  setAuth: (user: UserData) => void;
  validateToken: () => Promise<void>;
  logout: () => void;
};

type AuthStore = AuthState & AuthActions;

export const useAuthStore = create<AuthStore>()(
  persist(
    (set, get) => ({
      user: null,
      accessToken: null,
      isAuthenticated: false,
      isLoading: false,
      setAuth: (user) => set({ user, accessToken: user.token, isAuthenticated: true }),
      validateToken: async () => {
        const accessToken = get().accessToken;

        if (!accessToken) {
          set({ isAuthenticated: false, user: null, isLoading: false });
          return;
        }

        set({ isLoading: true });

        try {
          const user = await currentUser();
          set({ user, accessToken: user.token, isAuthenticated: true });
        } catch (error) {
          set({ user: null, accessToken: null, isAuthenticated: false });
        } finally {
          set({ isLoading: false });
        }
      },
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
