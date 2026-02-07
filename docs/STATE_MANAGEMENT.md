# State Management

This project uses **Zustand** for state management with persistence support.

## Stores

### Cart Store (`useCart`)

Manages shopping cart state with localStorage persistence.

```typescript
import { useCart, useCartSummary, useIsInCart, useCartItemCount } from '@/stores';

// Basic usage
function ProductCard({ product }) {
  const { addItem, removeItem, updateQuantity } = useCart();
  const itemCount = useCartItemCount(product.id);
  const isInCart = useIsInCart(product.id);
  
  return (
    <div>
      <h3>{product.name}</h3>
      <button onClick={() => addItem({ 
        productId: product.id, 
        name: product.name, 
        price: product.price 
      })}>
        Add to Cart ({itemCount})
      </button>
    </div>
  );
}

// Cart summary
function CartSummary() {
  const { totalItems, totalPrice } = useCartSummary();
  
  return (
    <div>
      <p>Items: {totalItems}</p>
      <p>Total: ${totalPrice.toFixed(2)}</p>
    </div>
  );
}
```

**Cart Actions:**
- `addItem(item)` - Add item to cart (increments quantity if exists)
- `removeItem(productId)` - Remove item from cart
- `updateQuantity(productId, quantity)` - Update item quantity
- `clearCart()` - Remove all items
- `getItemCount(productId)` - Get quantity of specific item

### Auth Store (`useAuth`)

Manages user authentication state.

```typescript
import { useAuth } from '@/stores';

function Header() {
  const { user, isAuthenticated, login, logout } = useAuth();
  
  return (
    <header>
      {isAuthenticated ? (
        <>
          <span>Welcome, {user?.name}</span>
          <button onClick={logout}>Logout</button>
        </>
      ) : (
        <button onClick={() => login({ id: '1', email: 'user@example.com', name: 'John' })}>
          Login
        </button>
      )}
    </header>
  );
}
```

### UI Store (`useUI`)

Manages UI state like mobile menu, search, notifications, and theme.

```typescript
import { useUI } from '@/stores';

function App() {
  const { 
    isMobileMenuOpen, 
    toggleMobileMenu,
    notifications,
    addNotification 
  } = useUI();
  
  const showSuccess = () => {
    addNotification({
      type: 'success',
      message: 'Item added to cart!',
      duration: 3000
    });
  };
  
  return (
    <>
      <button onClick={toggleMobileMenu}>
        Menu
      </button>
      {/* Notification component can map over notifications */}
    </>
  );
}
```

## Hydration Safety

All store hooks are hydration-safe and handle Next.js SSR properly. They return default values during server-side rendering and hydration, then sync with the persisted state on the client.

## Persistence

- **Cart**: Persisted to localStorage (items only, totals recalculated)
- **Auth**: Persisted to localStorage (user and auth state)
- **UI**: Persisted to localStorage (theme only)

## TypeScript

All stores are fully typed. Import types from `@/stores`:

```typescript
import type { CartItem, CartStore, User, AuthStore, UIStore } from '@/stores';
```
