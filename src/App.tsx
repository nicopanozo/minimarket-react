import React, { useEffect } from 'react';
import { Provider, useSelector, useDispatch } from 'react-redux';
import { BrowserRouter as Router } from 'react-router-dom';
import store from './redux/store';
import AppRoutes from './routes';
import Navbar from './components/NavBar';
import { loadCartItems as loadCartItemsAction } from './features/cart/cartSlice';
import { loadCartItems } from './utils/storage';
import type { RootState } from './redux/store';
import './index.css';

const CartLoader: React.FC = () => {
  const dispatch = useDispatch();
  const user = useSelector((state: RootState) => state.user.user);
  const isAuthenticated = useSelector(
    (state: RootState) => state.user.isAuthenticated,
  );

  useEffect(() => {
    if (isAuthenticated && user?.email) {
      const userCartItems = loadCartItems(user.email);
      dispatch(loadCartItemsAction(userCartItems));
    } else {
      const anonymousCartItems = loadCartItems();
      dispatch(loadCartItemsAction(anonymousCartItems));
    }
  }, [user?.email, isAuthenticated, dispatch]);

  return null;
};

const App: React.FC = () => {
  return (
    <Provider store={store}>
      <Router>
        <div className="min-h-screen bg-white dark:bg-gray-900 transition-colors duration-300 ease-in-out">
          <CartLoader />
          <Navbar />
          <main className="flex-1">
            <AppRoutes />
          </main>
        </div>
      </Router>
    </Provider>
  );
};

export default App;
