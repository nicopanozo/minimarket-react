import type { OrderState } from '../features/order/orderSlice';
import type { RootState } from '../redux/store';

const STORAGE_CAR_ITEMS_KEY = 'cartItems';

export function loadCartItems() {
  try {
    const cartItems = JSON.parse(
      localStorage.getItem(STORAGE_CAR_ITEMS_KEY) || '[]',
    );
    return cartItems;
  } catch {
    return undefined;
  }
}

export function saveCartItems(state: RootState) {
  try {
    const cartItems = JSON.stringify(state.cart.items);
    localStorage.setItem(STORAGE_CAR_ITEMS_KEY, cartItems);
  } catch {
    // ignore
  }
}

export function loadOrder(): OrderState | undefined {
  return storage.get(STORAGE_KEYS.ORDERS, undefined);
}

export function saveOrder(state: RootState) {
  const order = state.order;
  storage.set(STORAGE_KEYS.ORDERS, order);
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
