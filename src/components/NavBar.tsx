import React from "react";
import { Link } from "react-router-dom";
import DarkModeToggle from "../components/DarkModeToggle"; 

const Navbar: React.FC = () => {
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

          {/* Navigation Links */}
          <div className="hidden md:flex items-center space-x-6">
            <Link
              to="/"
              className="text-secondary-700 dark:text-gray-200 hover:text-primary-600 dark:hover:text-primary-300 font-medium transition-colors"
            >
              Inicio
            </Link>
            <Link
              to="/cart"
              className="relative text-secondary-700 dark:text-gray-200 hover:text-primary-600 dark:hover:text-primary-300 font-medium transition-colors"
            >
              Carrito
              {/* Badge ejemplo */}
              <span className="absolute -top-2 -right-2 bg-danger-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                0
              </span>
            </Link>
            <Link to="/login" className="btn-secondary">
              Login
            </Link>
            <Link to="/admin" className="btn-primary">
              Admin
            </Link>

            {/* Dark mode toggle */}
            <DarkModeToggle />
          </div>

          {/* Mobile menu button (más adelante podés integrar toggle ahí también) */}
          <button className="md:hidden p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors">
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
    </nav>
  );
};

export default Navbar;
