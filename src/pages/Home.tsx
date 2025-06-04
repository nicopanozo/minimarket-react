import React from "react";

const Home: React.FC = () => {
  return (
    <div className="container-custom py-8">
      {/* Hero Section */}
      <div className="text-center mb-12">
        <h1 className="text-4xl md:text-6xl font-bold heading-dark mb-4">
          Bienvenido a{" "}
          <span className="text-primary-600 dark:text-primary-400">
            MiniMarket
          </span>
        </h1>
        <p className="text-xl subtle-text max-w-2xl mx-auto">
          Tu tienda online de confianza. Encuentra todo lo que necesitas con la
          mejor calidad y precios.
        </p>
      </div>

      {/* Placeholder Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {[1, 2, 3].map((item) => (
          <div
            key={item}
            className="card hover:shadow-card-hover transition-shadow"
          >
            <div className="h-48 bg-gray-200 dark:bg-gray-700 rounded-lg mb-4 animate-pulse"></div>
            <h3 className="text-lg font-semibold heading-dark mb-2">
              Producto {item}
            </h3>
            <p className="subtle-text mb-4">Descripción del producto aquí...</p>
            <button className="btn-primary w-full">Ver más</button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Home;
