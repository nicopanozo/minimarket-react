import { describe, it, expect } from 'vitest';
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

    expect(screen.getByText(mockProduct.name)).toBeInTheDocument();
    expect(screen.getByText(`$${mockProduct.price}`)).toBeInTheDocument();

    const image = screen.getByRole('img');
    expect(image).toHaveAttribute('src', mockProduct.imageUrl);
    expect(image).toHaveAttribute('alt', mockProduct.name);
  });

  it("should render an 'add to cart' button", () => {
    renderWithProviders(<ProductCard product={mockProduct} />);
    expect(
      screen.getByRole('button', { name: /add to cart/i }),
    ).toBeInTheDocument();
  });
});
