import React, { createContext, useReducer, useEffect } from "react";

export const CartContext = createContext();

const LOCAL_STORAGE_KEY = 'cartItems';

const cartReducer = (state, action) => {
  switch (action.type) {
    case 'ADD_TO_CART':
      const itemExistsInCart = state.find((item) => item.id === action.payload.id);
      if (itemExistsInCart) {
        return state.map((item) =>
          item.id === action.payload.id ? { ...item, amount: item.amount + 1 } : item
        );
      } else {
        return [...state, { ...action.payload, amount: 1 }];
      }
    case 'REMOVE_FROM_CART':
      const currentItem = state.find((item) => item.id === action.payload);
      if (!currentItem) {
        return state;
      }
      if (currentItem.amount > 1) {
        return state.map((item) =>
          item.id === action.payload ? { ...item, amount: item.amount - 1 } : item
        );
      }
      return state.filter((item) => item.id !== action.payload);
    case 'CLEAR_CART':
      localStorage.clear();
      return [];
    default:
      return state;
  }
};

export const CartProvider = ({ children }) => {
  const [cartItems, dispatch] = useReducer(cartReducer, [], () => {
    const savedCartItems = localStorage.getItem(LOCAL_STORAGE_KEY);
    return savedCartItems ? JSON.parse(savedCartItems) : [];
  });

  useEffect(() => {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(cartItems));
  }, [cartItems]);

  const addToCart = (item) => {
    dispatch({ type: 'ADD_TO_CART', payload: item });
  };

  const removeFromCart = (itemId) => {
    dispatch({ type: 'REMOVE_FROM_CART', payload: itemId });
  };

  const clearCart = () => {
    dispatch({ type: 'CLEAR_CART' });
  };

  const getCartTotal = () => {
    return cartItems.reduce((total, item) => total + item.price * item.amount, 0);
  };

  const cartItemCount = () => {
    return cartItems.reduce((total, item) => total + item.amount, 0);
  };

  return (
    <CartContext.Provider 
      value={{ 
        cartItems, 
        addToCart, 
        removeFromCart,
        clearCart, 
        getCartTotal,
        cartItemCount }}
      >
        {children}
    </CartContext.Provider>
  );
};
