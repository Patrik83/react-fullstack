import React, { createContext, useState, useEffect } from "react";

export const CartContext = createContext();

const LOCAL_STORAGE_KEY = 'cartItems';

export const CartProvider = ({ children }) => {
  // Hämta kundvagnsdatan från localStorage när komponenten monteras
  const [cartItems, setCartItems] = useState(() => {
    const savedCartItems = localStorage.getItem(LOCAL_STORAGE_KEY);
    return savedCartItems ? JSON.parse(savedCartItems) : [];
  });

  // Spara kundvagnsdatan till localStorage varje gång cartItems uppdateras
  useEffect(() => {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(cartItems));
  }, [cartItems]);

  const addToCart = (newItem) => {
    const itemExistsInCart = cartItems.find((item) => item.id === newItem.id);

    if (itemExistsInCart) {
      setCartItems((prevItems) =>
        prevItems.map((item) =>
          item.id === newItem.id ? { ...item, quantity: item.quantity + 1 } : item
        )
      );
      
    } else {
      setCartItems((prevItems) => [...prevItems, { ...newItem, quantity: 1 }]);
    }
  }

  const removeFromCart = (itemToRemove) => {
    setCartItems((prevItems) => {
      // Hitta den aktuella produkten i kundvagnen
      const currentItem = prevItems.find((item) => item.id === itemToRemove);
  
      // Om produkten inte finns, returnera oförändrad kundvagn
      if (!currentItem) {
        return prevItems;
      }
  
      // Om produkten har en kvantitet större än 1, minska kvantiteten med 1
      if (currentItem.quantity > 1) {
        return prevItems.map((item) =>
          item.id === itemToRemove ? { ...item, quantity: item.quantity - 1 } : item
        );
      }
  
      // Om produkten har kvantitet 1, ta bort den från kundvagnen
      return prevItems.filter((item) => item.id !== itemToRemove);
    });
  };
  
  const getCartTotal = () => {
    return cartItems.reduce((total, item) => total + item.price * item.quantity, 0);
  };

  return (
    <CartContext.Provider 
      value={{ 
        cartItems, 
        addToCart, 
        removeFromCart, 
        getCartTotal }}
      >
        {children}
    </CartContext.Provider>
  );
};