import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import type { RootState } from '../../redux/store';
import { loginStart, loginSuccess, loginFailure } from './userSlice';
import type { User } from '../../utils/storage';

const LoginPage: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
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
          reject('Email inválido');
        }
      }, 1000);
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!email || !password) {
      dispatch(loginFailure('Por favor, completa todos los campos'));
      return;
    }

    try {
      dispatch(loginStart());
      const userData = await simulateLogin(email);
      dispatch(loginSuccess(userData));

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
          <h1 className="text-3xl font-bold text-center text-secondary-900 mb-6">
            Iniciar Sesión
          </h1>

          {error && (
            <div className="bg-danger-50 border border-danger-200 text-danger-700 px-4 py-3 rounded mb-4">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-secondary-700 mb-2"
              >
                Email
              </label>
              <input
                id="email"
                type="email"
                value={email}
                onChange={e => setEmail(e.target.value)}
                className="input-field"
                placeholder="tu@email.com"
                disabled={loading}
              />
            </div>

            <div>
              <label
                htmlFor="password"
                className="block text-sm font-medium text-secondary-700 mb-2"
              >
                Contraseña
              </label>
              <input
                id="password"
                type="password"
                value={password}
                onChange={e => setPassword(e.target.value)}
                className="input-field"
                placeholder="••••••••"
                disabled={loading}
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className={`btn-primary w-full ${loading ? 'opacity-50 cursor-not-allowed' : ''}`}
            >
              {loading ? (
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
                  Iniciando sesión...
                </span>
              ) : (
                'Iniciar Sesión'
              )}
            </button>
          </form>

          <div className="mt-6 p-4 bg-secondary-50 rounded-lg">
            <p className="text-sm text-secondary-600 mb-2">
              <strong>Para probar:</strong>
            </p>
            <p className="text-xs text-secondary-500">
              • Admin: admin@minimarket.com
              <br />
              • Usuario: cualquier@email.com
              <br />• Contraseña: cualquier texto
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
