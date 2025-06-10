import React, { createContext, useState, useContext } from 'react';

// 1. Create the context
const CartContext = createContext();

// 2. Create a custom hook for easy access to the context
export const useCart = () => {
  return useContext(CartContext);
};

// 3. Create the Provider component
export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);

  const addToCart = (productToAdd) => {
    setCartItems(prevItems => {
      const existingItem = prevItems.find(item => item.id === productToAdd.id);
      
      if (existingItem) {
        // If item already exists, just increase the quantity
        return prevItems.map(item =>
          item.id === productToAdd.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      } else {
        // Otherwise, add the new item with a quantity of 1
        return [...prevItems, { ...productToAdd, quantity: 1 }];
      }
    });
  };

  const removeFromCart = (productId) => {
    setCartItems(prevItems => prevItems.filter(item => item.id !== productId));
  };

  const updateQuantity = (productId, newQuantity) => {
    if (newQuantity <= 0) {
      // If quantity is 0 or less, remove the item
      removeFromCart(productId);
    } else {
      setCartItems(prevItems =>
        prevItems.map(item =>
          item.id === productId ? { ...item, quantity: newQuantity } : item
        )
      );
    }
  };

  // The value that will be available to all consuming components
  const value = {
    cartItems,
    addToCart,
    removeFromCart,
    updateQuantity,
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};