// src/ProductPreview.js

import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

const ProductPreview = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [mainImage, setMainImage] = useState(null);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await axios.get(`http://127.0.0.1:8000/api/products/${id}/`);
        if (response.data.status === 'success') {
          setProduct(response.data.product);
          setMainImage(response.data.product.images[0]); // Set initial main image
        }
      } catch (error) {
        console.error('Error fetching product:', error);
      }
    };

    fetchProduct();
  }, [id]);

  if (!product) return <div>Loading...</div>;

  return (
    <div className="flex flex-col items-center max-w-md mx-auto p-5 border border-gray-300 rounded-lg">
      <div className="w-full">
        <img src={mainImage} alt={product.name} className="w-full max-w-xs rounded-lg" />
      </div>
      <div className="text-center mt-5">
        <h1 className="text-2xl font-bold">{product.name}</h1>
        <p className="mt-2 text-gray-600">{product.description}</p>
        <h2 className="mt-3 text-xl font-semibold">${product.price}</h2>
      </div>
      <div className="flex justify-center mt-5 space-x-4">
        {product.images && product.images.map((image, index) => (
          <img
            key={index}
            src={image}
            alt={`${product.name} ${index}`}
            onClick={() => setMainImage(image)}
            className={`w-12 h-12 cursor-pointer rounded-md border-2 ${
              mainImage === image ? 'border-black' : 'border-transparent'
            }`}
          />
        ))}
      </div>
    </div>
  );
};

export default ProductPreview;
