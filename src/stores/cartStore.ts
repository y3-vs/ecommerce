import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import { CartStore, CartItem } from './types';

const calculateTotals = (items: CartItem[]) => {
  const totalItems = items.reduce((sum, item) => sum + item.quantity, 0);
  const totalPrice = items.reduce((sum, item) => sum + item.price * item.quantity, 0);
  return { totalItems, totalPrice };
};

export const useCartStore = create<CartStore>()(
  persist(
    (set, get) => ({
      // Initial state
      items: [],
      totalItems: 0,
      totalPrice: 0,

      // Actions
      addItem: (newItem) => {
        const { items } = get();
        const existingItemIndex = items.findIndex(
          (item) => item.productId === newItem.productId
        );

        let updatedItems: CartItem[];

        if (existingItemIndex >= 0) {
          // Update existing item quantity
          updatedItems = items.map((item, index) =>
            index === existingItemIndex
              ? { ...item, quantity: item.quantity + (newItem.quantity || 1) }
              : item
          );
        } else {
          // Add new item
          const item: CartItem = {
            ...newItem,
            id: `${newItem.productId}-${Date.now()}`,
            quantity: newItem.quantity || 1,
          };
          updatedItems = [...items, item];
        }

        const totals = calculateTotals(updatedItems);
        set({ items: updatedItems, ...totals });
      },

      removeItem: (productId) => {
        const { items } = get();
        const updatedItems = items.filter((item) => item.productId !== productId);
        const totals = calculateTotals(updatedItems);
        set({ items: updatedItems, ...totals });
      },

      updateQuantity: (productId, quantity) => {
        if (quantity <= 0) {
          get().removeItem(productId);
          return;
        }

        const { items } = get();
        const updatedItems = items.map((item) =>
          item.productId === productId ? { ...item, quantity } : item
        );
        const totals = calculateTotals(updatedItems);
        set({ items: updatedItems, ...totals });
      },

      clearCart: () => {
        set({ items: [], totalItems: 0, totalPrice: 0 });
      },

      getItemCount: (productId) => {
        const { items } = get();
        const item = items.find((item) => item.productId === productId);
        return item?.quantity || 0;
      },
    }),
    {
      name: 'ecommerce-cart-storage',
      storage: createJSONStorage(() => localStorage),
      partialize: (state) => ({ items: state.items }),
    }
  )
);

// Initialize totals from persisted items
useCartStore.subscribe((state, prevState) => {
  if (state.items !== prevState.items) {
    const totals = calculateTotals(state.items);
    useCartStore.setState(totals);
  }
});
