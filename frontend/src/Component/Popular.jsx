// src/Popular.jsx

import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Item from './Item';

const Popular = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://127.0.0.1:8000/api/products/');
        if (response.data.status === 'success') {
          setProducts(response.data.products);
        }
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  const lastFourProducts = products.slice(-4);

  return (
    <div className="grid items-center grid-cols-1 ps-20 sm:p-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
    <h1 className="text-4xl font-medium text-center font-Poppins mt-9 col-span-full">
      New Arrival
    </h1>
    <hr className="w-[200px] mx-auto  h-2 bg-gray-400 rounded-xl col-span-full" />
    {lastFourProducts.map((item) => (
      <Item data={item} key={item.id}/>
    ))}
  </div>
);
};

export default Popular;
