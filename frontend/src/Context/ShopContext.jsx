import React, { createContext, useState } from 'react';

// Create the context
export const ShopContext = createContext();

export const ShopProvider = ({ children }) => {
  const [cartItem, setCartItem] = useState({});
  const [all_products, setAllProducts] = useState([
    // Example products
    { id: 1, name: 'Shoes', price: 50 },
    { id: 2, name: 'T-shirt', price: 30 },
  ]);

  const getCartTotalAmount = () => {
    let total = 0;
    for (let id in cartItem) {
      const product = all_products.find(p => p.id === parseInt(id));
      if (product) {
        total += cartItem[id] * product.price;
      }
    }
    return total;
  };

  const addToCart = (productId) => {
    setCartItem(prev => ({
      ...prev,
      [productId]: (prev[productId] || 0) + 1,
    }));
  };

  const removeFromCart = (productId) => {
    setCartItem(prev => {
      const updated = { ...prev };
      if (updated[productId]) {
        updated[productId] -= 1;
        if (updated[productId] <= 0) {
          delete updated[productId];
        }
      }
      return updated;
    });
  };

  return (
    <ShopContext.Provider value={{
      cartItem,
      all_products,
      getCartTotalAmount,
      addToCart,
      removeFromCart,
    }}>
      {children}
    </ShopContext.Provider>
  );
};
