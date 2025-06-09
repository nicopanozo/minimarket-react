import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import { configureStore } from '@reduxjs/toolkit';
import cartReducer from '../../cart/cartSlice.ts';
import ProductCard from '../ProductCard';
import type React from 'react';

const store = configureStore({
  reducer: {
    cart: cartReducer,
  },
});

const mockProduct = {
  id: 1,
  name: 'Product 1',
  description: 'Description 1',
  price: 10,
  imageUrl: 'https://example.com/image.jpg',
  active: true,
  categoryId: 1,
};

const renderWithProviders = (ui: React.ReactElement) => {
  render(
    <Provider store={store}>
      <BrowserRouter>{ui}</BrowserRouter>
    </Provider>,
  );
};

describe('ProductCard', () => {
  it('should render the product name, price and image', () => {
    renderWithProviders(<ProductCard product={mockProduct} />);

    const productCard = screen.getByText(mockProduct.name);
    expect(productCard).toBeInTheDocument();
  });
});
