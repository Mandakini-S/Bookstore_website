// src/Component/CartItems.jsx
import React, { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { FaTrash } from 'react-icons/fa';
import axiosInstance from "../Component/axios";

const CartItems = () => {
  const navigate = useNavigate();
  const [cartItems, setCartItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [removeMessage, setRemoveMessage] = useState("");

  useEffect(() => {
    const fetchCartItems = async () => {
      try {
        const res = await axiosInstance.get("/api/cartitem/");
        if (res.data.status === "success") {
          setCartItems(res.data.cart_items);
        } else {
          console.warn("Unexpected response:", res.data);
        }
      } catch (err) {
        console.error("Error fetching cart items:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchCartItems();
  }, []);

  const isEmptyCart = cartItems.length === 0;

  const handleProceedToPayment = () => {
    navigate('/payment');
  };

  const getTotal = () => {
    return cartItems.reduce((sum, item) => sum + item.product.price * item.quantity, 0);
  };

  const updateQuantity = async (itemId, newQuantity) => {
    if (newQuantity < 1) return;

    try {
      await axiosInstance.patch(`/api/cartitem/${itemId}/`, { quantity: newQuantity });
      setCartItems(prev =>
        prev.map(item =>
          item.id === itemId ? { ...item, quantity: newQuantity } : item
        )
      );
    } catch (error) {
      console.error("Error updating cart item quantity:", error);
    }
  };

  const handleRemoveItem = async (itemId) => {
    try {
      await axiosInstance.delete(`/api/cartitem/${itemId}/`);
      setCartItems(prev => prev.filter(item => item.id !== itemId));
      setRemoveMessage("Item has been removed from your cart.");
      setTimeout(() => setRemoveMessage(""), 3000);
    } catch (error) {
      console.error("Error removing cart item:", error);
      setRemoveMessage("Failed to remove item. Please try again.");
      setTimeout(() => setRemoveMessage(""), 3000);
    }
  };

  if (loading) {
    return <p>Loading...</p>;
  }

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <div className="flex flex-col lg:flex-row w-full lg:w-3/4">
        <div className="p-6 rounded-lg w-full lg:w-2/3 lg:mr-4 mb-4 lg:mb-0">
          <h2 className="text-5xl font-semibold mb-6 heading-font">Shopping Cart.</h2>
          <div className="mb-4">
            {removeMessage && (
              <div className="mb-4 p-2 bg-green-100 text-green-700 border border-green-300 rounded">
                {removeMessage}
              </div>
            )}

            <div className="flex justify-between mb-4 ml-25">
              <span className="font-semibold">Product</span>
              <span className="font-semibold hidden md:inline">Size</span>
              <span className="font-semibold">Quantity</span>
              <span className="font-semibold">Total Price</span>
            </div>

            {isEmptyCart ? (
              <p className="text-center text-gray-500 text-lg mt-8">Your cart is empty.</p>
            ) : (
              cartItems.map((item) => (
                <div className="flex justify-between items-center border-b py-2" key={item.id}>
                  <div className="flex items-center">
                    <img
                      src={`http://localhost:8000${item.product.image}`}
                      alt={item.product.name}
                      className="w-12 h-12 rounded mr-2"
                    />
                    <div>
                      <p className="font-semibold max-w-44">{item.product.name}</p>
                      <p className="text-gray-500 text-sm">Black</p>
                    </div>
                  </div>

                  <select className="border rounded p-1 -ml-28 hidden md:inline">
                    <option>Default</option>
                  </select>

                  <div className="flex items-center">
                    <button className="p-1" onClick={() => updateQuantity(item.id, item.quantity - 1)}>-</button>
                    <span className="mx-2">{item.quantity}</span>
                    <button className="p-1" onClick={() => updateQuantity(item.id, item.quantity + 1)}>+</button>
                  </div>

                  <span className="mr-4">${item.product.price * item.quantity}</span>

                  <button
                    onClick={() => handleRemoveItem(item.id)}
                    className="text-red-600 hover:text-red-800 p-1"
                    title="Remove Item"
                  >
                    <FaTrash size={16} />
                  </button>
                </div>
              ))
            )}
          </div>

          <div className="flex justify-between mt-6">
            <Link to={"/"}>
              <button className="text-blue-500">&larr; Continue Shopping</button>
            </Link>
            <div className="text-right">
              <p className="font-semibold">Subtotal: ${getTotal()}</p>
              <p className="font-semibold">Shipping: $0</p>
              <p className="font-bold text-xl">Total: ${getTotal()}</p>
              <button
                className="bg-blue-500 text-white p-2 rounded mt-4 ml-100"
                onClick={handleProceedToPayment}
              >
                Proceed to Payment
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartItems;
