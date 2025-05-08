// Pages/ProductPreview.jsx
import React, { useState, useEffect, useContext } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import AuthContext from '../Context/AuthContext';

const ProductPreview = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [mainImage, setMainImage] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const { isAuthenticated, user } = useContext(AuthContext); // Access user from context
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await axios.get(`http://127.0.0.1:8000/api/products/${id}/`);
        if (response.data.status === 'success') {
          setProduct(response.data.product);
          setMainImage(`http://localhost:8000${response.data.product.image}`);
        }
      } catch (error) {
        console.error('Error fetching product:', error);
      }
    };

    fetchProduct();
  }, [id]);

  const handleAddToCart = async () => {
    if (!isAuthenticated) {
      navigate('/login');
    } else if (!user || !user.id) {
      console.error('User information is not available.');
    } else {
      try {
        const token = localStorage.getItem('access_token');
  
        const response = await axios.post(
          `http://127.0.0.1:8000/api/cartitem/`,
          {
            user: user.id,
            product_id: id,
            quantity,
          },
          {
            headers: {
              Authorization: `Token ${token}`,  
              'Content-Type': 'application/json',
            },
          }
        );
  
        console.log('Added to cart:', response.data);
      } catch (error) {
        console.error('Error adding to cart:', error);
      }
    }
  };
  

  // const handleOrderNow = () => {
  //   if (!isAuthenticated) {
  //     navigate('/login');
  //   } else {
  //     // Implement your order now logic here
  //     console.log(`Ordering ${quantity} item(s) now`);
  //   }
  // };

  if (!product) return <div>Loading...</div>;

  return (
    <div className="flex flex-col items-center max-w-4xl mx-auto sm:mx-5 my-24 p-5 rounded-2xl md:mx-20">
      <div className="flex flex-col md:flex-row w-full items-center">
        <div className="w-full md:w-1/2 flex justify-center md:justify-start">
          <img src={mainImage} alt={product.name} className="w-full max-w-xs rounded-lg" />
        </div>
        <div className="text-center md:text-left mt-5 md:mt-0 md:ml-10 flex-grow flex flex-col justify-center">
          <h1 className="text-2xl font-bold">{product.name}</h1>
          <p className="mt-2 text-gray-600 flex-grow">{product.description}</p>
          <h2 className="mt-3 text-xl font-semibold">${product.price}</h2>
          <div className="flex justify-center md:justify-start mt-5 space-x-4">
            {product.images && product.images.map((image, index) => (
              <img
                key={index}
                src={`http://localhost:8000${image}`}
                alt={`${product.name} ${index}`}
                onClick={() => setMainImage(`http://localhost:8000${image}`)}
                className={`w-12 h-12 cursor-pointer rounded-md border-2 ${
                  mainImage === `http://localhost:8000${image}` ? 'border-black' : 'border-transparent'
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
              onChange={(e) => setQuantity(parseInt(e.target.value))}
              className="border-gray-300 border-2 rounded-md px-3 py-1 focus:outline-none focus:border-blue-200"
            />
          </div>
          <button
            onClick={handleAddToCart}
            className="bg-blue-500 hover:bg-blue-600 mt-10 text-white px-4 py-2 rounded-md focus:outline-none focus:ring focus:border-blue-300"
            style={{ backgroundColor: '#347576' }}
          >
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductPreview;
