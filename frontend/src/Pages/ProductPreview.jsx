// Pages/ProductPreview.jsx
import React, { useState, useEffect, useContext, useCallback } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import AuthContext from '../Context/AuthContext';

const ProductPreview = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const { isAuthenticated, user } = useContext(AuthContext);
  const navigate = useNavigate();
  const baseUrl = 'http://localhost:8000';

  // Fetch product details
  const fetchProduct = useCallback(async () => {
    console.log(`Fetching product with ID: ${id}`);

    try {
      const response = await axios.get(`${baseUrl}/api/products/${id}/`);
      if (response.data.status === 'success') {
        console.log('Product fetched successfully:', response.data.product);
        setProduct(response.data.product);
      } else {
        console.error('Failed to fetch product: Status not success', response.data);
      }
    } catch (error) {
      console.error('Error fetching product:', error);
    }
  }, [id]);

  // UseEffect to fetch product when ID changes
  useEffect(() => {
    fetchProduct();
  }, [fetchProduct]);

  // Handle adding item to cart
  const handleAddToCart = async () => {
  if (!isAuthenticated) {
    console.warn('User is not authenticated. Redirecting to login...');
    navigate('/login');
    return;
  }

  if (!user?.id) {
    console.error('User information is not available. Cannot proceed with adding to cart.');
    return;
  }

  const token = localStorage.getItem('access_token');
  if (!token) {
    console.error('No access token found. User may not be logged in.');
    return;
  }

  console.log('Sending request to add product to cart...');
  try {
    const response = await axios.post(
      `${baseUrl}/api/cartitem/`,
      {
        product: id,
        quantity,
        user: user.id,  // Pass the user ID here
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      }
    );
    console.log('Successfully added to cart:', response.data);
  } catch (error) {
    console.error('Error adding to cart:', error);
    alert('There was an error adding the item to the cart. Please try again later.');
  }
};


  // If product is not loaded, show loading message
  if (!product) {
    console.log('Product is loading...');
    return <div>Loading product...</div>;
  }

  const handleImageClick = (image) => {
    console.log(`Changing main image to: ${image}`);
    setProduct((prevProduct) => ({
      ...prevProduct,
      mainImage: `${baseUrl}${image}`,
    }));
  };

  // Validate the quantity input
  const handleQuantityChange = (e) => {
    const newQuantity = parseInt(e.target.value);
    if (newQuantity < 1) {
      console.warn('Quantity must be at least 1. Resetting to 1.');
      setQuantity(1);
    } else {
      setQuantity(newQuantity);
    }
  };

  console.log('Rendering ProductPreview component');
  return (
    <div className="flex flex-col items-center max-w-4xl mx-auto sm:mx-5 my-24 p-5 rounded-2xl md:mx-20">
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
          <p className="mt-2 text-gray-600 flex-grow">{product.description}</p>
          <h2 className="mt-3 text-xl font-semibold">${product.price}</h2>
          <div className="flex justify-center md:justify-start mt-5 space-x-4">
            {product.images && product.images.map((image, index) => (
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
          <button
            onClick={handleAddToCart}
            className="bg-blue-500 hover:bg-blue-600 mt-10 text-white px-4 py-2 rounded-md focus:outline-none focus:ring focus:border-blue-300"
            style={{ backgroundColor: '#347576' }}
            disabled={quantity < 1 || !product} // Disable button when quantity is invalid or product is not loaded
          >
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductPreview;
