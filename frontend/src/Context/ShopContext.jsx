import React, { createContext, useState, useEffect } from 'react';

// Create the context
export const ShopContext = createContext();

export const ShopProvider = ({ children }) => {
  const [cartItem, setCartItem] = useState({});
  const [all_products, setAllProducts] = useState([]);

  // Fetch products dynamically
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch('http://127.0.0.1:8000/api/products/');
        const data = await response.json();
        setAllProducts(data);
      } catch (error) {
        console.error('Failed to fetch products:', error);
      }
    };

    fetchProducts();
  }, []);

  // Calculate total price of items in cart
  const getCartTotalAmount = () => {
    return Object.entries(cartItem).reduce((total, [id, quantity]) => {
      const product = all_products.find(p => p.id === parseInt(id));
      return product ? total + quantity * product.price : total;
    }, 0);
  };

  // Add an item to cart
  const addToCart = (productId) => {
    setCartItem(prev => ({
      ...prev,
      [productId]: (prev[productId] || 0) + 1,
    }));
  };
console.log(cartItem);
  // Remove an item from cart
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
      addToCart,
      removeFromCart,
      getCartTotalAmount,
    }}>
      {children}
    </ShopContext.Provider>
  );
};
