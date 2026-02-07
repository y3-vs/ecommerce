'use client';

import { useEffect, useState } from 'react';
import { useCartStore, useAuthStore, useUIStore } from './index';
import type { CartStore, AuthStore, UIStore } from './index';

// Hydration-safe hook for cart store
export function useCart(): CartStore {
  const [mounted, setMounted] = useState(false);
  const store = useCartStore();

  useEffect(() => {
    setMounted(true); // eslint-disable-line react-hooks/set-state-in-effect
  }, []);

  // Return default values during SSR/hydration
  if (!mounted) {
    return {
      items: [],
      totalItems: 0,
      totalPrice: 0,
      addItem: () => {},
      removeItem: () => {},
      updateQuantity: () => {},
      clearCart: () => {},
      getItemCount: () => 0,
    };
  }

  return store;
}

// Hydration-safe hook for auth store
export function useAuth(): AuthStore {
  const [mounted, setMounted] = useState(false);
  const store = useAuthStore();

  useEffect(() => {
    setMounted(true); // eslint-disable-line react-hooks/set-state-in-effect
  }, []);

  if (!mounted) {
    return {
      user: null,
      isAuthenticated: false,
      isLoading: true,
      setUser: () => {},
      login: () => {},
      logout: () => {},
      setLoading: () => {},
    };
  }

  return store;
}

// Hydration-safe hook for UI store
export function useUI(): UIStore {
  const [mounted, setMounted] = useState(false);
  const store = useUIStore();

  useEffect(() => {
    setMounted(true); // eslint-disable-line react-hooks/set-state-in-effect
  }, []);

  if (!mounted) {
    return {
      isMobileMenuOpen: false,
      isSearchOpen: false,
      searchQuery: '',
      notifications: [],
      theme: 'system',
      toggleMobileMenu: () => {},
      closeMobileMenu: () => {},
      toggleSearch: () => {},
      closeSearch: () => {},
      setSearchQuery: () => {},
      addNotification: () => {},
      removeNotification: () => {},
      clearNotifications: () => {},
      setTheme: () => {},
    };
  }

  return store;
}
