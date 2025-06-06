import type { User } from '../../../utils/storage';

const MOCK_USERS = [
  { email: 'admin@minimarket.com', name: 'Admin User', isAdmin: true },
  { email: 'user@example.com', name: 'Regular User', isAdmin: false },
  { email: 'john@example.com', name: 'John Doe', isAdmin: false },
];

export const loginUser = async (email: string): Promise<User> => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const user = MOCK_USERS.find(
        u => u.email.toLowerCase() === email.toLowerCase(),
      );

      if (user) {
        resolve(user);
      } else {
        reject(new Error('Usuario no encontrado'));
      }
    }, 1000);
  });
};

export const isValidEmail = (email: string): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};
