import React, { createContext, useState, useEffect, useCallback } from 'react';

export const CartContext = createContext();

const LOCAL_STORAGE_KEY = 'cartItems';

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState(() => {
    const storedCartItems = localStorage.getItem(LOCAL_STORAGE_KEY);
    try {
      return storedCartItems ? JSON.parse(storedCartItems) : [];
    } catch (error) {
      console.error('Error parsing cart items:', error);
      return [];
    }
  });

  const addToCart = useCallback((item) => {
    setCartItems((prevCartItems) => {
      const updatedCartItems = [...prevCartItems];
      const existingItem = updatedCartItems.find((cartItem) => cartItem.id === item.id);

      if (existingItem) {
        existingItem.quantity += 1;
      } else {
        updatedCartItems.push({ ...item, quantity: 1 });
      }

      return updatedCartItems;
    });
  }, []);

  const removeFromCart = useCallback((item) => {
    setCartItems((prevCartItems) => {
      const updatedCartItems = [...prevCartItems];
      const existingItem = updatedCartItems.find((cartItem) => cartItem.id === item.id);

      if (existingItem) {
        if (existingItem.quantity === 1) {
          return updatedCartItems.filter((cartItem) => cartItem.id !== item.id);
        } else {
          existingItem.quantity -= 1;
        }
      }

      return updatedCartItems;
    });
  }, []);

  const clearCart = useCallback(() => {
    setCartItems([]);
  }, []);

  const getCartTotal = () => {
    return cartItems.reduce((total, item) => total + item.price * item.quantity, 0);
  };

  useEffect(() => {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(cartItems));
  }, [cartItems]);

  return (
    <CartContext.Provider
      value={{
        cartItems,
        addToCart,
        removeFromCart,
        clearCart,
        getCartTotal,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};
