import React from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter as Router } from 'react-router-dom';
import store from './redux/store';
import AppRoutes from './routes';
import Navbar from './components/NavBar';
import './index.css';

const App: React.FC = () => {
  return (
    <Provider store={store}>
      <Router>
        <div className="min-h-screen bg-white dark:bg-gray-900 transition-colors duration-300 ease-in-out">
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
