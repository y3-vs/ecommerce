// Custom hook for cart selectors
import { useCart } from './hooks';

// Hook to get cart item count for a specific product
export function useCartItemCount(productId: string): number {
  const { getItemCount } = useCart();
  return getItemCount(productId);
}

// Hook to check if product is in cart
export function useIsInCart(productId: string): boolean {
  const { items } = useCart();
  return items.some((item) => item.productId === productId);
}

// Hook to get cart summary
export function useCartSummary() {
  const { totalItems, totalPrice, items } = useCart();
  return { totalItems, totalPrice, items };
}
