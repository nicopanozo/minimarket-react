import React from 'react';
const ProductDetail: React.FC = () => {
  return (
    <div
      id="productDetailPage"
      className="flex flex-col lg:h-screen lg:items-center lg:pb-4 bg-gray-100"
    >
      <div id="productDetail" className="flex flex-col p-4 lg:w-2/3">
        <div id="breadcrumbs__menu" className="mb-4 flex">
          <span className="text-sm text-gray-600">
            <span className="text-blue-600">Home</span> &gt; Wireless Headphones
          </span>
        </div>
        <div
          id="productDetail_main"
          className="mb-10 flex flex-col lg:flex-row"
        >
          <div id="product" className="flex flex-col lg:flex-row lg:flex-1">
            <div
              id="product__image"
              className="lg:basis-1/2 rounded-xl overflow-hidden shadow-sm"
            >
              <img
                className="w-full h-full object-cover"
                src="https://picsum.photos/seed/lamp/400/300"
              />
            </div>
            <div
              id="product__data"
              className="flex flex-col pt-6 gap-4 lg:basis-1/2 lg:px-4"
            >
              <div
                id="product__data__title"
                className="flex flex-col gap-8 lg:flex-row lg:justify-between"
              >
                <span className="text-xl font-semibold text-gray-800">
                  Wireless Headphones
                </span>
                <span className="text-xl font-semibold text-gray-900">
                  $89.99
                </span>
              </div>
              <div id="product__data__controls" className="flex flex-col">
                <span className="text-sm text-gray-600 mb-1">Quantity</span>
                <div id="counter" className="mb-4 flex gap-2">
                  <button className="px-3 py-1 rounded-md bg-gray-200 hover:bg-gray-300 text-gray-800 transition">
                    −
                  </button>
                  <span className="px-3 py-1 text-gray-700 border border-gray-300 rounded-md">
                    1
                  </span>
                  <button className="px-3 py-1 rounded-md bg-gray-200 hover:bg-gray-300 text-gray-800 transition">
                    +
                  </button>
                </div>
                <button className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-medium py-2 px-4 rounded-lg shadow-md transition">
                  Add to Cart
                </button>
              </div>
              <div
                id="product__data__description"
                className="flex flex-col gap-1"
              >
                <span className="text-sm text-gray-600">Description</span>
                <span className="text-sm text-gray-700">
                  High-quality wireless headphones with noise cancellation and
                  long battery life.
                </span>
              </div>
            </div>
          </div>
        </div>
        <div id="recommendations" className="flex flex-col pt-4">
          <span className="mb-6 text-2xl font-semibold text-gray-900 tracking-wide">
            Related products
          </span>
          <div
            id="recommendations__list"
            className="flex justify-evenly gap-4 overflow-hidden"
          >
            {[1, 2, 3].map(() => {
              return (
                <div
                  id="card"
                  className="flex flex-col border border-gray-300 rounded-xl overflow-hidden"
                >
                  <div id="card__image" className="w-full h-48 bg-gray-100">
                    <img
                      className="w-full h-full object-cover"
                      src="https://picsum.photos/seed/lamp/400/300"
                    />
                  </div>
                  <div id="card__data" className="flex flex-col gap-2 p-4">
                    <span className="text-base font-medium text-gray-800">
                      Smartphone
                    </span>
                    <span className="text-sm text-gray-600">$56.00</span>
                    <button className="mt-2 w-full bg-indigo-600 hover:bg-indigo-700 text-white text-sm py-2 rounded-md transition">
                      Add to Cart
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
