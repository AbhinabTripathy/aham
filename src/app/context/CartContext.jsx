'use client';
import React, { createContext, useContext, useState, useEffect } from 'react';

const CartContext = createContext();

export function CartProvider({ children }) {
  const [cartItems, setCartItems] = useState([]);

  // Load cart from localStorage on mount
  useEffect(() => {
    const savedCart = localStorage.getItem('cart');
    if (savedCart) {
      setCartItems(JSON.parse(savedCart));
    }
  }, []);

  // Save cart to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cartItems));
  }, [cartItems]);

  const addToCart = (product) => {
    setCartItems(prevItems => {
      const existingItem = prevItems.find(item => 
        item.id === product.id && item.size === product.size
      );

      if (existingItem) {
        // If item exists, increase quantity up to maximum of 10
        return prevItems.map(item =>
          item.id === product.id && item.size === product.size
            ? { 
                ...item, 
                quantity: Math.min(item.quantity + (product.quantity || 1), 10)
              }
            : item
        );
      }

      // If item doesn't exist, add it
      return [...prevItems, { ...product, quantity: product.quantity || 1 }];
    });
  };

  const updateQuantity = (itemId, size, newQuantity) => {
    setCartItems(prevItems =>
      prevItems.map(item =>
        item.id === itemId && item.size === size
          ? { ...item, quantity: Math.min(newQuantity, 10) }
          : item
      )
    );
  };

  const removeFromCart = (itemId, size) => {
    setCartItems(prevItems => 
      prevItems.filter(item => !(item.id === itemId && item.size === size))
    );
  };

  const getCartTotal = () => {
    return cartItems.reduce((total, item) => total + (item.price * item.quantity), 0);
  };

  const getCartCount = () => {
    return cartItems.reduce((total, item) => total + item.quantity, 0);
  };

  return (
    <CartContext.Provider value={{
      cartItems,
      addToCart,
      updateQuantity,
      removeFromCart,
      getCartTotal,
      getCartCount
    }}>
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
} 