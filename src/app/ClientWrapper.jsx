'use client';

import { CartProvider } from './context/CartContext';
import Footer from './Footer';

export default function ClientWrapper({ children }) {
  return (
    <>
      <CartProvider>
        {children}
      </CartProvider>
      <Footer />
    </>
  );
} 