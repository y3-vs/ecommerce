export interface CartItem {
  id: string;
  productId: string;
  name: string;
  price: number;
  quantity: number;
  image?: string;
}

export interface CartState {
  items: CartItem[];
  totalItems: number;
  totalPrice: number;
}

export interface CartActions {
  addItem: (item: Omit<CartItem, 'id' | 'quantity'> & { quantity?: number }) => void;
  removeItem: (productId: string) => void;
  updateQuantity: (productId: string, quantity: number) => void;
  clearCart: () => void;
  getItemCount: (productId: string) => number;
}

export type CartStore = CartState & CartActions;
