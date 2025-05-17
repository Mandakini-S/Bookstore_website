// Pages/ProductPreview.jsx
import React, { useState, useEffect, useContext, useCallback } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axiosInstance from '../Component/axios';
import AuthContext from '../Context/AuthContext';

const ProductPreview = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [message, setMessage] = useState('');
  const [messageType, setMessageType] = useState('');
  const { isAuthenticated } = useContext(AuthContext);
  const navigate = useNavigate();
  const baseUrl = 'http://localhost:8000';

  // Fetch product
  const fetchProduct = useCallback(async () => {
    try {
      const response = await axiosInstance.get(`/api/products/${id}/`);
      if (response.data.status === 'success') {
        setProduct(response.data.product);
      } else {
        console.error('Failed to fetch product:', response.data);
      }
    } catch (error) {
      console.error('Error fetching product:', error);
    }
  }, [id]);

  useEffect(() => {
    fetchProduct();
  }, [fetchProduct]);

  const handleAddToCart = async () => {
    if (!isAuthenticated) {
      navigate('/login');
      return;
    }

    try {
      await axiosInstance.post('/api/cartitem/', {
        product_id: id,
        quantity,
      });

      setMessage('Item successfully added to your cart.');
      setMessageType('success');
    } catch (error) {
      console.error('Add to cart error:', error);

      const errorMsg =
        error.response?.data?.detail ||
        error.response?.data?.message ||
        'There was an error adding the item to the cart.';

      setMessage(errorMsg);
      setMessageType('error');
    }

    setTimeout(() => {
      setMessage('');
      setMessageType('');
    }, 3000);
  };

  const handleImageClick = (image) => {
    setProduct((prev) => ({
      ...prev,
      mainImage: `${baseUrl}${image}`,
    }));
  };

  const handleQuantityChange = (e) => {
    const newQuantity = parseInt(e.target.value);
    setQuantity(newQuantity >= 1 ? newQuantity : 1);
  };

  if (!product) {
    return <div>Loading product...</div>;
  }

  return (
    <div className="flex flex-col items-center max-w-4xl mx-auto my-24 p-5 rounded-2xl">
      {/* Feedback Message */}
      {message && (
        <div
          className={`mb-6 px-4 py-2 w-full text-center rounded border ${
            messageType === 'success'
              ? 'bg-green-100 text-green-700 border-green-300'
              : 'bg-red-100 text-red-700 border-red-300'
          }`}
        >
          {message}
        </div>
      )}

      <div className="flex flex-col md:flex-row w-full items-center">
        <div className="w-full md:w-1/2 flex justify-center md:justify-start">
          <img
            src={product.mainImage ? `${baseUrl}${product.mainImage}` : `${baseUrl}${product.image}`}
            alt={product.name}
            className="w-full max-w-xs rounded-lg"
          />
        </div>

        <div className="text-center md:text-left mt-5 md:mt-0 md:ml-10 flex-grow flex flex-col justify-center">
          <h1 className="text-2xl font-bold">{product.name}</h1>
          <p className="mt-2 text-gray-600">{product.description}</p>
          <h2 className="mt-3 text-xl font-semibold">${product.price}</h2>

          {/* Thumbnails */}
          <div className="flex justify-center md:justify-start mt-5 space-x-4">
            {product.images?.map((image, index) => (
              <img
                key={index}
                src={`${baseUrl}${image}`}
                alt={`${product.name} ${index}`}
                onClick={() => handleImageClick(image)}
                className={`w-12 h-12 cursor-pointer rounded-md border-2 ${
                  product.mainImage === image ? 'border-black' : 'border-transparent'
                }`}
              />
            ))}
          </div>

          {/* Quantity input */}
          <div className="mt-5 flex items-center justify-center md:justify-start space-x-4">
            <label className="text-gray-700">Quantity:</label>
            <input
              type="number"
              min="1"
              value={quantity}
              onChange={handleQuantityChange}
              className="border-gray-300 border-2 rounded-md px-3 py-1 focus:outline-none focus:border-blue-200"
            />
          </div>

          {/* Add to Cart Button */}
          <button
            onClick={handleAddToCart}
            className="bg-[#347576] hover:bg-[#2d5f61] mt-10 text-white px-4 py-2 rounded-md focus:outline-none"
            disabled={quantity < 1 || !product}
          >
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductPreview;
