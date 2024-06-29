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
          setMainImage(`http://localhost:8000${response.data.product.image}`);
        }
      } catch (error) {
        console.error('Error fetching product:', error);
      }
    };

    fetchProduct();
  }, [id]);

  if (!product) return <div>Loading...</div>;

  return (
    <div className="flex flex-col items-center max-w-4xl mx-auto sm:mx-5 my-24 p-5 border-2 border-gray-300 rounded-2xl md:mx-20">
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
        </div>
      </div>
    </div>
  );
};

export default ProductPreview;
