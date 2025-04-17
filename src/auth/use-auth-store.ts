import { create } from 'zustand';
import { UserData } from './auth.types';

export type AuthState = {
  user: UserData | null;
};

export type AuthAction = {
  setUser: (user: UserData | null) => void;
};

export const useAuthStore = create<AuthState & AuthAction>((set) => ({
  user: null,
  setUser: (user) => set({ user }),
}));
