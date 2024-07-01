import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Item from '../Component/Item';

const Product = () => {
  const [products, setProducts] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://127.0.0.1:8000/api/products/');
        if (response.data.status === 'success') {
          setProducts(response.data.products);
          setFilteredProducts(response.data.products);
        }
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    setFilteredProducts(
      products.filter((product) => {
        const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase());
        const matchesCategory = selectedCategory ? product.category === parseInt(selectedCategory) : true;
        return matchesSearch && matchesCategory;
      })
    );
  }, [searchQuery, selectedCategory, products]);

  return (
    <div className="grid items-center grid-cols-1 ps-20 sm:p-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
      <div className="col-span-full flex justify-center items-center space-x-4">
        <input
          type="text"
          placeholder="Search products..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full max-w-xs p-2 border border-gray-600 rounded-xl"
        />
        <select
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
          className="p-2 border-2 border-[#347576] rounded-xl"
        >
          <option value="">All Categories</option>
          <option value="1">Sports</option>
          <option value="2">Stationery</option>
          <option value="3">Books</option>
        </select>
      </div>
      <h1 className="text-4xl font-medium text-center font-Poppins mt-9 col-span-full">
        Our Collection
      </h1>
      <hr className="w-[200px] mx-auto h-2 bg-gray-400 rounded-xl col-span-full" />
      
      {filteredProducts.length === 0 ? (
        <p className="col-span-full text-center text-gray-500">There is nothing to show.</p>
      ) : (
        filteredProducts.map((item) => (
          <Item data={item} key={item.id} />
        ))
      )}
    </div>
  );
};

export default Product;
