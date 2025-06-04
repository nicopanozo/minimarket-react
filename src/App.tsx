// filepath: src/App.tsx
import React from "react";
import { Provider } from "react-redux";
import { BrowserRouter as Router } from "react-router-dom";
import store from "./redux/store";
import AppRoutes from "./routes";
import Navbar from "./components/NavBar";
import "./index.css";

const App: React.FC = () => {
  return (
    <Provider store={store}>
      <Router>
        <div className="min-h-screen bg-gray-50">
          <Navbar />
          <main className="min-h-[calc(100vh-4rem)]">
            <AppRoutes />
          </main>
        </div>
      </Router>
    </Provider>
  );
};

export default App;
