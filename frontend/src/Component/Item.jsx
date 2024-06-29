import React from 'react';
import { Link } from 'react-router-dom';

const Item = (props) => {
  const { image, name, price, description, id } = props.data;
  const baseUrl = "http://localhost:8000/"; 
  const imageUrl = `${baseUrl}${image}`;
  console.log(image);

  return (
    <div className="m-5 md:mx-20 mr-2 cursor-pointer dark:text-white ">
      <Link to={`/product/${id}`}>
        <div className="transition delay-300 scale-100 hover:scale-95 dark:hover:brightness-75 border-2 rounded-2xl border-gray-300 dark:border-gray-200 p-4 w-72 h-96 flex flex-col items-center">
          <img
            onClick={() => window.scrollTo(0, 0)}
            src={imageUrl}
            alt={name}
            className="w-64 h-64 object-cover transition delay-300 scale-100 hover:scale-95"
          />
          <p className="text-black dark:text-black-800 max-w-80 mt-2">{name}</p>
          {/* <p className="text-gray-500 dark:text-gray-400 max-w-80">{category}</p> */}
          <p className="text-gray-500 dark:text-gray-400 max-w-80">{description}</p>
          <div className="flex flex-row gap-3 mt-auto">
            <p className="font-semibold text-black dark:text-black">$ {price}</p>
          </div>
        </div>
      </Link>
    </div>
  );
};

export default Item;
