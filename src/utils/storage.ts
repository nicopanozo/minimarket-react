import type { OrderState } from '../features/order/orderSlice';
import type { RootState } from '../redux/store';
import type { CartItem } from '../features/cart/cartSlice';

const STORAGE_CAR_ITEMS_KEY = 'cartItems';

const getUserCartKey = (userEmail: string) =>
  `${STORAGE_KEYS.CART}_${userEmail}`;

export function loadCartItems(userEmail?: string) {
  try {
    if (userEmail) {
      const userCartKey = getUserCartKey(userEmail);
      const userCartItems = JSON.parse(
        localStorage.getItem(userCartKey) || '[]',
      );
      return userCartItems;
    }
    const cartItems = JSON.parse(
      localStorage.getItem(STORAGE_CAR_ITEMS_KEY) || '[]',
    );
    return cartItems;
  } catch {
    return [];
  }
}

export function saveCartItems(state: RootState, userEmail?: string) {
  try {
    const cartItems = JSON.stringify(state.cart.items);
    if (userEmail) {
      const userCartKey = getUserCartKey(userEmail);
      localStorage.setItem(userCartKey, cartItems);
    } else {
      localStorage.setItem(STORAGE_CAR_ITEMS_KEY, cartItems);
    }
  } catch {
    // ignore
  }
}

export function migrateAnonymousCartToUser(userEmail: string) {
  try {
    const anonymousCart = JSON.parse(
      localStorage.getItem(STORAGE_CAR_ITEMS_KEY) || '[]',
    );

    const userCartKey = getUserCartKey(userEmail);
    const userCart = JSON.parse(localStorage.getItem(userCartKey) || '[]');

    if (anonymousCart.length > 0) {
      const combinedCart = [...userCart];

      anonymousCart.forEach((anonymousItem: CartItem) => {
        const existingItem = combinedCart.find(
          item =>
            item.name === anonymousItem.name &&
            item.price === anonymousItem.price,
        );

        if (existingItem) {
          existingItem.quantity += anonymousItem.quantity;
        } else {
          combinedCart.push(anonymousItem);
        }
      });

      localStorage.setItem(userCartKey, JSON.stringify(combinedCart));

      localStorage.removeItem(STORAGE_CAR_ITEMS_KEY);

      return combinedCart;
    }

    return userCart;
  } catch (error) {
    console.error('Error migrating anonymous cart:', error);
    return [];
  }
}

export function clearUserCart(userEmail: string) {
  try {
    const userCartKey = getUserCartKey(userEmail);
    localStorage.removeItem(userCartKey);
  } catch (error) {
    console.error('Error clearing user cart:', error);
  }
}

export function saveOrder(order: OrderState) {
  try {
    localStorage.setItem(STORAGE_KEYS.ORDERS, JSON.stringify(order));
  } catch (error) {
    console.error('Error saving order to localStorage:', error);
  }
}

export function loadOrder(): OrderState | null {
  try {
    const data = localStorage.getItem(STORAGE_KEYS.ORDERS);
    return data ? JSON.parse(data) : null;
  } catch (error) {
    console.error('Error loading order from localStorage:', error);
    return null;
  }
}

export const storage = {
  set: (key: string, value: unknown) => {
    try {
      localStorage.setItem(key, JSON.stringify(value));
    } catch (error) {
      console.error('Error saving to localStorage:', error);
    }
  },

  get: (key: string, defaultValue = null) => {
    try {
      const item = localStorage.getItem(key);
      return item ? JSON.parse(item) : defaultValue;
    } catch (error) {
      console.error('Error reading from localStorage:', error);
      return defaultValue;
    }
  },

  remove: (key: string) => {
    try {
      localStorage.removeItem(key);
    } catch (error) {
      console.error('Error removing from localStorage:', error);
    }
  },

  clearAll: () => {
    try {
      Object.values(STORAGE_KEYS).forEach(key => {
        localStorage.removeItem(key);
      });
    } catch (error) {
      console.error('Error clearing localStorage:', error);
    }
  },
};

export const STORAGE_KEYS = {
  USER: 'minimarket_user',
  CART: 'minimarket_cart',
  PRODUCTS: 'minimarket_products',
  ORDERS: 'minimarket_orders',
  THEME: 'minimarket_theme',
};

export interface User {
  email: string;
  name: string;
  isAdmin: boolean;
}

export interface CartItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
  image: string;
}

export interface Order {
  id: string;
  userEmail: string;
  items: CartItem[];
  total: number;
  timestamp: number;
}
