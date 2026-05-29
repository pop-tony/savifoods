import React from 'react'
import { createContext, useContext, useState, useEffect, useRef } from 'react';
import { v4 as uuidv4 } from 'uuid';

const CartContext = createContext();

export function CartProvider({ children }) {
  const [cartItems, setCartItems] = useState([]);
  const isInitialLoad = useRef(true);

  useEffect(() => {
    console.log('[CART] Loading from localStorage...');
    try {
      const saved = localStorage.getItem('savifood-cart');
      console.log('[CART] Raw saved data:', saved);
      if (saved) {
        const parsed = JSON.parse(saved);
        console.log('[CART] Parsed data:', parsed);
        if (Array.isArray(parsed) && parsed.length > 0) {
          setCartItems(parsed);
          console.log('[CART] Loaded', parsed.length, 'items');
        } else {
          console.log('[CART] No items to load or invalid format');
        }
      } else {
        console.log('[CART] Nothing in localStorage');
      }
    } catch (error) {
      console.error('[CART] Failed to load cart:', error);
      localStorage.removeItem('savifood-cart');
    } finally {
      isInitialLoad.current = false;
    }
  }, []);

  // Save to localStorage
  useEffect(() => {
    if (isInitialLoad.current) {
      
      return;
    }
    
    localStorage.setItem('savifood-cart', JSON.stringify(cartItems));
  }, [cartItems]);

  const addToCart = (product) => {
    const newItem = {
    ...product,
      cartItemId: uuidv4(),
      quantity: 1,
      addedAt: Date.now()
    };
    setCartItems(prev => [...prev, newItem]);
  };

  const removeFromCart = (cartItemId) => {
    setCartItems(prev => prev.filter(item => item.cartItemId!== cartItemId));
  };

  const updateQuantity = (cartItemId, quantity) => {
    if (quantity < 1) {
      removeFromCart(cartItemId);
      return;
    }
    setCartItems(prev =>
      prev.map(item =>
        item.cartItemId === cartItemId? {...item, quantity } : item
      )
    );
  };

  const cartTotal = cartItems.reduce((sum, item) => sum + (parseFloat(item.price) * item.quantity), 0);
  const cartCount = cartItems.length;

  const clearCart = () => {
    setCartItems([]);
    localStorage.removeItem('savifood-cart');
  };

  return (
    <CartContext.Provider value={{
      cartItems,
      addToCart,
      removeFromCart,
      updateQuantity,
      cartTotal,
      cartCount,
      clearCart
    }}>
      {children}
    </CartContext.Provider>
  );
}

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) throw new Error('useCart must be used within CartProvider');
  return context;
};