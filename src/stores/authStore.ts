import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';

export interface User {
  id: string;
  email: string;
  name: string;
}

export interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
}

export interface AuthActions {
  setUser: (user: User | null) => void;
  login: (user: User) => void;
  logout: () => void;
  setLoading: (isLoading: boolean) => void;
}

export type AuthStore = AuthState & AuthActions;

export const useAuthStore = create<AuthStore>()(
  persist(
    (set) => ({
      // Initial state
      user: null,
      isAuthenticated: false,
      isLoading: true,

      // Actions
      setUser: (user) => {
        set({ user, isAuthenticated: !!user });
      },

      login: (user) => {
        set({ user, isAuthenticated: true, isLoading: false });
      },

      logout: () => {
        set({ user: null, isAuthenticated: false, isLoading: false });
      },

      setLoading: (isLoading) => {
        set({ isLoading });
      },
    }),
    {
      name: 'ecommerce-auth-storage',
      storage: createJSONStorage(() => localStorage),
      partialize: (state) => ({ user: state.user, isAuthenticated: state.isAuthenticated }),
    }
  )
);
