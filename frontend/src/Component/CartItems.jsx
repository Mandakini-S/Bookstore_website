// Component/CartItems.jsx
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import img from '../assets/about.png';

const CartItems = () => {
  const navigate = useNavigate();
  const [cartItems, setCartItems] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCartItems = async () => {
      try {
        const token = localStorage.getItem("access_token");
        if (!token) {
          console.error("No access token found. Cannot fetch cart items.");
          return;
        }
        console.log("Fetching cart items with token:", token);

        const res = await fetch("http://localhost:8000/api/cartitem/", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        console.log("Response status:", res.status);
        const data = await res.json();
        console.log("Cart items response data:", data);

        if (data.status === "success") {
          setCartItems(data.cart_items);
          console.log("Cart items set:", data.cart_items);
        } else {
          console.warn("Unexpected response:", data);
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
    console.log("Proceeding to payment with cart:", cartItems);
    navigate('/payment');
  };

  const getTotal = () => {
    const total = cartItems.reduce((sum, item) => {
      return sum + item.product.price * item.quantity;
    }, 0);
    console.log("Calculated cart total:", total);
    return total;
  };

  if (loading) {
    console.log("Loading cart items...");
    return <p>Loading...</p>;
  }

  const updateQuantity = async (itemId, newQuantity) => {
    if (newQuantity < 1) return;

    try {
      const token = localStorage.getItem("access_token");

      const res = await fetch(`http://localhost:8000/api/cartitem/${itemId}/`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ quantity: newQuantity }),
      });

      if (!res.ok) {
        throw new Error("Failed to update quantity");
      }

      // const updatedItem = await res.json();
      // setCartItems(prev =>
      //   prev.map(item => (item.id === itemId ? { ...item, quantity: updatedItem.quantity } : item))
      // );
      setCartItems(prev =>
        prev.map(item =>
          item.id === itemId
            ? { ...item, quantity: newQuantity } // just use newQuantity directly
            : item
        )
      );

    } catch (error) {
      console.error("Error updating cart item quantity:", error);
    }
  };


  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <div className="flex flex-col lg:flex-row w-full lg:w-3/4">
        <div className="p-6 rounded-lg w-full lg:w-2/3 lg:mr-4 mb-4 lg:mb-0">
          <h2 className="text-5xl font-semibold mb-6 heading-font">Shopping Cart.</h2>
          <div className="mb-4">
            <div className="flex justify-between mb-4 ml-25">
              <span className="font-semibold">Product</span>
              <span className="font-semibold hidden md:inline">Size</span>
              <span className="font-semibold">Quantity</span>
              <span className="font-semibold">Total Price</span>
            </div>
            {isEmptyCart ? (
              <img src={img} alt="Empty Cart" />
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

                  <span>${item.product.price * item.quantity}</span>
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
