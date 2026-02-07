import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';

export interface Address {
  id: string;
  street1: string;
  street2?: string;
  city: string;
  state: string;
  zipCode: string;
  country: string;
  phone?: string;
  isDefault: boolean;
}

export interface UIState {
  // Mobile menu
  isMobileMenuOpen: boolean;
  // Search
  isSearchOpen: boolean;
  searchQuery: string;
  // Notifications
  notifications: Notification[];
  // Theme
  theme: 'light' | 'dark' | 'system';
}

export interface Notification {
  id: string;
  type: 'success' | 'error' | 'info' | 'warning';
  message: string;
  duration?: number;
}

export interface UIActions {
  // Mobile menu actions
  toggleMobileMenu: () => void;
  closeMobileMenu: () => void;
  // Search actions
  toggleSearch: () => void;
  closeSearch: () => void;
  setSearchQuery: (query: string) => void;
  // Notification actions
  addNotification: (notification: Omit<Notification, 'id'>) => void;
  removeNotification: (id: string) => void;
  clearNotifications: () => void;
  // Theme actions
  setTheme: (theme: 'light' | 'dark' | 'system') => void;
}

export type UIStore = UIState & UIActions;

export const useUIStore = create<UIStore>()(
  persist(
    (set, get) => ({
      // Initial state
      isMobileMenuOpen: false,
      isSearchOpen: false,
      searchQuery: '',
      notifications: [],
      theme: 'system',

      // Actions
      toggleMobileMenu: () => {
        set((state) => ({ isMobileMenuOpen: !state.isMobileMenuOpen }));
      },

      closeMobileMenu: () => {
        set({ isMobileMenuOpen: false });
      },

      toggleSearch: () => {
        set((state) => ({ isSearchOpen: !state.isSearchOpen }));
      },

      closeSearch: () => {
        set({ isSearchOpen: false, searchQuery: '' });
      },

      setSearchQuery: (query) => {
        set({ searchQuery: query });
      },

      addNotification: (notification) => {
        const id = `notification-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
        const newNotification = { ...notification, id };
        
        set((state) => ({
          notifications: [...state.notifications, newNotification],
        }));

        // Auto-remove notification after duration
        if (notification.duration !== 0) {
          const duration = notification.duration || 5000;
          setTimeout(() => {
            get().removeNotification(id);
          }, duration);
        }
      },

      removeNotification: (id) => {
        set((state) => ({
          notifications: state.notifications.filter((n) => n.id !== id),
        }));
      },

      clearNotifications: () => {
        set({ notifications: [] });
      },

      setTheme: (theme) => {
        set({ theme });
      },
    }),
    {
      name: 'ecommerce-ui-storage',
      storage: createJSONStorage(() => localStorage),
      partialize: (state) => ({ theme: state.theme }),
    }
  )
);
