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

    // Uppdatera kvantiteten om produkten redan finns i kundvagnen
    if (itemExistsInCart) {
      setCartItems((prevItems) =>
        prevItems.map((item) =>
          item.id === newItem.id ? { ...item, amount: item.amount + 1 } : item
        )
      );
      
    // Lägg annars till en ny produkt
    } else {
      setCartItems((prevItems) => [...prevItems, { ...newItem, amount: 1 }]);
    }
  }

  const removeFromCart = (itemToRemove) => {
    setCartItems((prevItems) => {
      // Sök efter den aktuella produkten i kundvagnen
      const currentItem = prevItems.find((item) => item.id === itemToRemove);
  
      // Om produkten inte finns, returnera en oförändrad kundvagn
      if (!currentItem) {
        return prevItems;
      }
  
      // Om det finns fler än 1 produkt, ta bort en
      if (currentItem.amount > 1) {
        return prevItems.map((item) =>
          item.id === itemToRemove ? { ...item, amount: item.amount - 1 } : item
        );
      }
  
      // Om det bara finns produkt, ta bort den
      return prevItems.filter((item) => item.id !== itemToRemove);
    });
  };
  
  const getCartTotal = () => {
    return cartItems.reduce((total, item) => total + item.price * item.amount, 0);
  };

  const cartItemCount = () => {
    return cartItems.reduce((total, item) => total + item.amount, 0);
  }

  return (
    <CartContext.Provider 
      value={{ 
        cartItems, 
        addToCart, 
        removeFromCart, 
        getCartTotal,
        cartItemCount }}
      >
        {children}
    </CartContext.Provider>
  );
};