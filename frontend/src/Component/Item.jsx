// src/Item.jsx

import React from 'react';
import { Link } from 'react-router-dom';

const Item = (props) => {
  const { image, name, price, category, description, id } = props.data;
  const baseUrl = "../../../backend"; 
  const imageUrl = `${baseUrl}${image}`;
  console.log(imageUrl); 

  return (
    <div className="m-5 cursor-pointer dark:text-white">
      <Link to={`/product/${id}`}>
        <div className="transition delay-300 scale-100 hover:scale-95 dark:hover:brightness-75">
          <img
            onClick={() => window.scrollTo(0, 0)}
            src={imageUrl}
            alt={name}
            className="transition delay-300 scale-100 hover:scale-95"
          />
          <p className="text-gray-500 dark:text-gray-400 max-w-80">{name}</p>
          <p className="text-gray-500 dark:text-gray-400 max-w-80">{category}</p>
          <p className="text-gray-500 dark:text-gray-400 max-w-80">{description}</p>
          <div className="flex flex-row gap-3">
            <p className="font-semibold text-black dark:text-black">$ {price}</p>
          </div>
        </div>
      </Link>
    </div>
  );
};

export default Item;
