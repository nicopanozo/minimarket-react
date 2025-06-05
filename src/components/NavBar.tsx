import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import type { RootState } from "../redux/store";
import { logout } from "../features/user/userSlice";
import DarkModeToggle from "./DarkModeToggle";

const Navbar: React.FC = () => {
  const { user, isAuthenticated } = useSelector(
    (state: RootState) => state.user,
  );
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);

  const handleLogout = () => {
    dispatch(logout());
    navigate("/");
    setMenuOpen(false);
  };

  return (
    <nav className="bg-white dark:bg-gray-800 shadow-navbar sticky top-0 z-50 text-gray-900 dark:text-white">
      <div className="container-custom">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link
            to="/"
            className="text-2xl font-bold text-primary-600 dark:text-primary-300 hover:text-primary-700 dark:hover:text-primary-200 transition-colors"
          >
            MiniMarket
          </Link>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center space-x-6">
            <Link
              to="/"
              className="hover:text-primary-600 dark:hover:text-primary-300"
            >
              Inicio
            </Link>
            <Link
              to="/cart"
              className="relative hover:text-primary-600 dark:hover:text-primary-300"
            >
              Carrito
              <span className="absolute -top-2 -right-2 bg-danger-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                0
              </span>
            </Link>
            {isAuthenticated && user ? (
              <div className="flex items-center space-x-4">
                <span className="dark:text-gray-200">Hola, {user.name}</span>
                {user.isAdmin && (
                  <Link to="/admin" className="btn-primary text-sm px-3 py-1">
                    Admin
                  </Link>
                )}
                <button
                  onClick={handleLogout}
                  className="btn-secondary text-sm px-3 py-1"
                >
                  Cerrar Sesión
                </button>
              </div>
            ) : (
              <Link to="/login" className="btn-primary">
                Iniciar Sesión
              </Link>
            )}
            <DarkModeToggle />
          </div>

          {/* Mobile Toggle */}
          <div className="flex md:hidden items-center space-x-2">
            <DarkModeToggle />
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition"
              aria-label="Toggle Menu"
            >
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile Menu Dropdown */}
        {menuOpen && (
          <div className="flex flex-col md:hidden space-y-4 mt-4 p-4 bg-white dark:bg-gray-800 rounded-lg shadow">
            <Link
              to="/"
              onClick={() => setMenuOpen(false)}
              className="hover:text-primary-600 dark:hover:text-primary-300"
            >
              Inicio
            </Link>
            <Link
              to="/cart"
              onClick={() => setMenuOpen(false)}
              className="hover:text-primary-600 dark:hover:text-primary-300"
            >
              Carrito
            </Link>
            {isAuthenticated && user ? (
              <>
                <span className="dark:text-gray-200">Hola, {user.name}</span>
                {user.isAdmin && (
                  <Link
                    to="/admin"
                    onClick={() => setMenuOpen(false)}
                    className="btn-primary text-sm px-3 py-1"
                  >
                    Admin
                  </Link>
                )}
                <button
                  onClick={handleLogout}
                  className="btn-secondary text-sm px-3 py-1"
                >
                  Cerrar Sesión
                </button>
              </>
            ) : (
              <Link
                to="/login"
                onClick={() => setMenuOpen(false)}
                className="btn-primary"
              >
                Iniciar Sesión
              </Link>
            )}
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
