import React from "react";

const ProductDetail: React.FC = () => {
  return (
    <div id="productDetail" className="flex flex-col p-4 gap-4  border-[3px] border-solid border-red-500">
      <div id="breadcrumbs__menu" className="flex border-[3px] border-solid border-blue-500">
        <span className="border-[3px] border-solid border-green-500">Home / WWiresless Haedphones</span>
      </div>
      <div id="product" className="flex flex-col p-4 gap-4 border-[3px] border-solid border-yellow-500">
        <div id="product__image" className="border-[3px] border-solid border-purple-500">
          <span className="border-[3px] border-solid border-pink-500">image</span>
        </div>
        <div id="product__data" className="flex flex-col p-4 gap-4 border-[3px] border-solid border-orange-500">
          <div id="product__data__title" className="flex flex-col border-[3px] border-solid border-cyan-500">
            <span className="border-[3px] border-solid border-lime-500">Wirless Headphones</span>
            <span className="border-[3px] border-solid border-rose-500">$89.99</span>
          </div>
          <div id="product__data__controls" className="flex flex-col border-[3px] border-solid border-fuchsia-500">
            <span className="border-[3px] border-solid border-amber-500">Queantity</span>
            <div id="counter" className="flex  border-[3px] border-solid border-emerald-500">
              <button className="border-[3px] border-solid border-indigo-500">miuns</button>
              <span className="border-[3px] border-solid border-teal-500">1</span>
              <button className="border-[3px] border-solid border-sky-500">more</button>
            </div>
            <button className="w-full flex border-[3px] border-solid border-violet-500 bg-purple-700">Add to cart</button>
          </div>
          <div id="product__data__description" className="flex flex-col border-[3px] border-solid border-stone-500">
            <span className="border-[3px] border-solid border-neutral-500">Description</span>
            <span className="border-[3px] border-solid border-zinc-500">
              High-quality wireless headphones with noise cancellation and long battery life.
            </span>
          </div>
        </div>
      </div>
      <div id="recommendations" className="flex flex-col border-[3px] border-solid border-red-400">
        <span className="border-[3px] border-solid border-blue-400">Related products</span>
        <div id="recommendations__list" className="flex border-[3px] border-solid border-green-400">
          <div id="card" className="flex flex-col border-[3px] border-solid border-yellow-400">
            <div id="card__image" className="border-[3px] border-solid border-purple-400">
              <span className="border-[3px] border-solid border-pink-400">image</span>
            </div>
            <div id="card__data" className="flex flex-col border-[3px] border-solid border-orange-400">
              <span className="border-[3px] border-solid border-cyan-400">Smartphone</span>
              <span className="border-[3px] border-solid border-lime-400">$56.00</span>
              <button className="border-[3px] border-solid border-rose-400"> Add to cart</button>
            </div>
          </div>
        </div>
      </div>
      <div id="footer" className="border-[3px] border-solid border-black">
        footer
      </div>
    </div>
  );
};

export default ProductDetail;
