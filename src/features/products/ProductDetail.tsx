import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import type { Product } from '../../types/Product';
import { productsData } from '../../data/products';
import { useDispatch, useSelector } from 'react-redux';
import type { AppDispatch, RootState } from '../../redux/store';
import { addItem, incrementQuantity, type CartItem } from '../cart/cartSlice';

const ProductDetail: React.FC = () => {
  const { productId } = useParams();
  const [product, setProduct] = useState<Product | undefined | null>(undefined);
  const [relatedProducts, setRelatedProducts] = useState<Product[]>([]);
  const dispatch = useDispatch<AppDispatch>();
  const cartItems = useSelector((state: RootState) => state.cart.items);

  useEffect(() => {
    const getProduct = (id: number) => {
      const product = productsData.find(p => p.id === id);
      return product;
    };

    const getRelatedProducts = (categoryId: number) => {
      const products = productsData.filter(p => p.categoryId === categoryId);
      return products;
    };

    const foundProduct = getProduct(parseInt(productId!))!;
    if (!foundProduct) {
      setProduct(null);
      setRelatedProducts([]);
    } else {
      const relatedProducs = getRelatedProducts(foundProduct.categoryId);
      setProduct(foundProduct);
      setRelatedProducts(relatedProducs);
    }
  }, [productId]);

  const handleOnClckAddToCart = () => {
    const itemExists = cartItems.some(
      caritem => caritem.productId === product!.id,
    );

    if (itemExists) {
      const cartItem = cartItems.find(
        cartItem => cartItem.productId === product!.id,
      )!;
      dispatch(incrementQuantity(cartItem.id));
      return;
    }

    const newCartItem: CartItem = {
      id: Math.random().toString(36).slice(2, 11),
      name: product!.name,
      price: product!.price,
      quantity: 1,
      imageUrl: product!.imageUrl,
      productId: product!.id,
    };

    dispatch(addItem(newCartItem));
  };

  const handleOnClickAddToCartId = (id: number) => {
    const product = relatedProducts.find(p => p.id === id)!;
    const itemExists = cartItems.some(
      caritem => caritem.productId === product!.id,
    );
    if (itemExists) {
      const cartItem = cartItems.find(
        cartItem => cartItem.productId === product!.id,
      )!;
      dispatch(incrementQuantity(cartItem.id));
      return;
    }

    const newCartItem: CartItem = {
      id: Math.random().toString(36).slice(2, 11),
      name: product!.name,
      price: product!.price,
      quantity: 1,
      imageUrl: product!.imageUrl,
      productId: product!.id,
    };

    dispatch(addItem(newCartItem));
  };

  if (product === undefined) {
    return <p>Loading the product..................................</p>;
  }

  if (product === null) {
    return (
      <div className="ml-auto mr-auto w-max flex flex-col items-center p-6 text-gray-700 dark:text-gray-300">
        <p className="text-lg font-bold">Product Not Found</p>
        <p className="mb-3">Sorry, we couldn&apos;t find that product.</p>
        <button className="px-3 py-1 bg-indigo-600 text-white rounded">
          <Link to="/">Go Back</Link>
        </button>
      </div>
    );
  }

  return (
    <div
      id="productDetailPage"
      className="flex flex-col lg:h-screen lg:items-center lg:pb-4 bg-gray-100 dark:bg-gray-900"
    >
      <div id="productDetail" className="flex flex-col p-4 lg:w-2/3">
        <div id="breadcrumbs__menu" className="mb-4 flex">
          <span className="text-sm text-gray-600 dark:text-gray-300">
            <span className="text-blue-600 dark:text-blue-400">Home</span> &gt;
            {product.name}
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
                alt="test image"
                className="w-full h-full object-cover"
                src={product.imageUrl}
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
                <span className="text-xl font-semibold text-gray-800 dark:text-gray-100">
                  {product.name}
                </span>
                <span className="text-xl font-semibold text-gray-900 dark:text-gray-100">
                  ${product.price}
                </span>
              </div>

              <div id="product__data__controls" className="flex flex-col">
                <button
                  className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-medium py-2 px-4 rounded-lg shadow-md transition"
                  onClick={handleOnClckAddToCart}
                >
                  Add to Cart
                </button>
              </div>

              <div
                id="product__data__description"
                className="flex flex-col gap-1"
              >
                <span className="text-sm text-gray-600 dark:text-gray-400">
                  Description
                </span>
                <span className="text-sm text-gray-700 dark:text-gray-300">
                  {product.description}
                </span>
              </div>
            </div>
          </div>
        </div>

        <div id="recommendations" className="flex flex-col pt-4">
          <span className="mb-6 text-2xl font-semibold text-gray-900 dark:text-gray-100 tracking-wide">
            Related products
          </span>
          <div
            id="recommendations__list"
            className="flex justify-evenly gap-4 overflow-hidden"
          >
            {relatedProducts?.map(product => {
              return (
                <div
                  key={product.id}
                  id="card"
                  className="flex flex-col border border-gray-300 dark:border-gray-700 rounded-xl overflow-hidden bg-white dark:bg-gray-800 hover:shadow-xl dark:hover:shadow-[0_0_16px_rgba(255,255,255,0.15)] transition-shadow duration-300"
                >
                  <div
                    id="card__image"
                    className="w-full h-48 bg-gray-100 dark:bg-gray-700"
                  >
                    <Link to={`/products/${product.id}`}>
                      <img
                        alt="another test image"
                        className="w-full h-full object-cover"
                        src={product.imageUrl}
                      />
                    </Link>
                  </div>
                  <div id="card__data" className="flex flex-col gap-2 p-4">
                    <span className="text-base font-medium text-gray-800 dark:text-gray-100">
                      <Link to={`/products/${product.id}`}>{product.name}</Link>
                    </span>
                    <span className="text-sm text-gray-600 dark:text-gray-300">
                      ${product.price}
                    </span>
                    <button
                      className="mt-2 w-full bg-indigo-600 hover:bg-indigo-700 text-white text-sm py-2 rounded-md transition"
                      onClick={() => handleOnClickAddToCartId(product.id)}
                    >
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
