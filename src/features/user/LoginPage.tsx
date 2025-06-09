import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import type { RootState } from '../../redux/store';
import { loginStart, loginSuccess, loginFailure } from './userSlice';
import { loadCartItems } from '../cart/cartSlice';
import { migrateAnonymousCartToUser } from '../../utils/storage';
import type { User } from '../../utils/storage';

interface LoginFormData {
  email: string;
  password: string;
}

const LoginPage: React.FC = () => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginFormData>();

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loading, error } = useSelector((state: RootState) => state.user);

  const simulateLogin = (email: string): Promise<User> => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (email.includes('@')) {
          const isAdmin = email === 'admin@minimarket.com';
          const name = email.split('@')[0];
          resolve({
            email,
            name: name.charAt(0).toUpperCase() + name.slice(1),
            isAdmin,
          });
        } else {
          reject('Invalid email');
        }
      }, 1000);
    });
  };

  const onSubmit = async (data: LoginFormData) => {
    try {
      dispatch(loginStart());
      const userData = await simulateLogin(data.email);
      const userCartItems = migrateAnonymousCartToUser(userData.email);
      dispatch(loadCartItems(userCartItems));
      dispatch(loginSuccess({ user: userData }));

      if (userData.isAdmin) {
        navigate('/admin');
      } else {
        navigate('/');
      }
    } catch (error) {
      dispatch(loginFailure(error as string));
    }
  };

  return (
    <div className="container-custom py-8">
      <div className="max-w-md mx-auto">
        <div className="card">
          <h1 className="text-3xl font-bold text-center text-secondary-900 dark:text-white mb-6">
            Login
          </h1>

          {error && (
            <div className="bg-danger-50 dark:bg-red-900/20 border border-danger-200 dark:border-red-600 text-danger-700 dark:text-red-400 px-4 py-3 rounded mb-4">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-secondary-700 dark:text-gray-300 mb-2"
              >
                Email
              </label>
              <input
                id="email"
                type="email"
                {...register('email', {
                  required: 'Email is required',
                  pattern: {
                    value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                    message: 'Invalid email address',
                  },
                })}
                className={`input-field ${errors.email ? 'border-red-500' : ''}`}
                placeholder="your@email.com"
                disabled={loading || isSubmitting}
              />
              {errors.email && (
                <p className="mt-1 text-sm text-red-600 dark:text-red-400">
                  {errors.email.message}
                </p>
              )}
            </div>

            <div>
              <label
                htmlFor="password"
                className="block text-sm font-medium text-secondary-700 dark:text-gray-300 mb-2"
              >
                Password
              </label>
              <input
                id="password"
                type="password"
                {...register('password', {
                  required: 'Password is required',
                  minLength: {
                    value: 1,
                    message: 'Password must be at least 1 character',
                  },
                })}
                className={`input-field ${errors.password ? 'border-red-500' : ''}`}
                placeholder="••••••••"
                disabled={loading || isSubmitting}
              />
              {errors.password && (
                <p className="mt-1 text-sm text-red-600 dark:text-red-400">
                  {errors.password.message}
                </p>
              )}
            </div>

            <button
              type="submit"
              disabled={loading || isSubmitting}
              className={`btn-primary w-full ${loading || isSubmitting ? 'opacity-50 cursor-not-allowed' : ''}`}
            >
              {loading || isSubmitting ? (
                <span className="flex items-center justify-center">
                  <svg
                    className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    ></circle>
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    ></path>
                  </svg>
                  Signing in...
                </span>
              ) : (
                'Sign In'
              )}
            </button>
          </form>

          <div className="mt-6 p-4 bg-secondary-50 dark:bg-gray-700 rounded-lg">
            <p className="text-sm text-secondary-600 dark:text-gray-300 mb-2">
              <strong>Test credentials:</strong>
            </p>
            <p className="text-xs text-secondary-500 dark:text-gray-400">
              • Admin: admin@minimarket.com
              <br />
              • User: any@email.com
              <br />• Password: any text
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
