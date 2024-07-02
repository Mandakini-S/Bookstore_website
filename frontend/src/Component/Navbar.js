import React, { useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import HamburgerIcon from '../assets/hamburger.png';
import BrandIcon from '../assets/logo.png';

const Navbar = () => {
  const [showNavbar, setShowNavbar] = useState(false);
  const navigate = useNavigate();

  const handleShowNavbar = () => {
    setShowNavbar(!showNavbar);
  };

  const handleClick = () => {
    navigate('/');
  };

  return (
    <nav className="bg-white shadow-lg">
      <div className="container mx-auto px-4 flex justify-between items-center h-16">
        <div className="flex items-center">
          <img
            onClick={handleClick}
            src={BrandIcon}
            alt="Icon"
            className="cursor-pointer w-60"
          />
        </div>
        <div className="hidden sm:flex flex-grow justify-center">
          <ul className="text-sm flex list-none p-4 sm:p-0 mt-4 sm:mt-0">
            <li className="mr-6">
              <NavLink
                to="/"
                className={({ isActive }) =>
                  isActive
                    ? 'block mt-4 sm:mt-0 text-gray-800 font-semibold border-b-2 border-red-600'
                    : 'block mt-4 sm:mt-0 text-gray-600 hover:text-gray-800'
                }
              >
                Home
              </NavLink>
            </li>
            <li className="mr-6">
              <NavLink
                to="/product"
                className={({ isActive }) =>
                  isActive
                    ? 'block mt-4 sm:mt-0 text-gray-800 font-semibold border-b-2 border-red-600'
                    : 'block mt-4 sm:mt-0 text-gray-600 hover:text-gray-800'
                }
              >
                Products
              </NavLink>
            </li>
            <li className="mr-6">
              <NavLink
                to="/about"
                className={({ isActive }) =>
                  isActive
                    ? 'block mt-4 sm:mt-0 text-gray-800 font-semibold border-b-2 border-red-600'
                    : 'block mt-4 sm:mt-0 text-gray-600 hover:text-gray-800'
                }
              >
                About Us
              </NavLink>
              
            </li>
            <li className="mr-6">
              <NavLink
                to="/free_products"
                className={({ isActive }) =>
                  isActive
                    ? 'block mt-4 sm:mt-0 text-gray-800 font-semibold border-b-2 border-red-600'
                    : 'block mt-4 sm:mt-0 text-gray-600 hover:text-gray-800'
                }
              >
                Free Products
              </NavLink>
            </li>
            <li className="mr-6">
              <NavLink
                to="/contact"
                className={({ isActive }) =>
                  isActive
                    ? 'block mt-4 sm:mt-0 text-gray-800 font-semibold border-b-2 border-red-600'
                    : 'block mt-4 sm:mt-0 text-gray-600 hover:text-gray-800'
                }
              >
                Contact
              </NavLink>
            </li>
          </ul>
        </div>
        <div className="block sm:hidden">
          <button
            onClick={handleShowNavbar}
            className="flex items-center px-3 py-2 border rounded text-gray-600 border-gray-400 hover:text-gray-800 hover:border-gray-500"
          >
            <img src={HamburgerIcon} alt="Hamburger" className="w-10" />
          </button>
        </div>
        <div
          className={`w-full block flex-grow sm:hidden ${
            showNavbar ? 'block' : 'hidden'
          }`}
        >
          <ul className="text-sm flex flex-col items-center list-none p-4 sm:p-0 mt-4 sm:mt-0">
            <li className="mb-4">
              <NavLink
                to="/"
                className={({ isActive }) =>
                  isActive
                    ? 'block mt-4 sm:mt-0 text-gray-800 font-semibold border-b-2 border-red-600'
                    : 'block mt-4 sm:mt-0 text-gray-600 hover:text-gray-800'
                }
              >
                Home
              </NavLink>
            </li>
            <li className="mb-4">
              <NavLink
                to="/feature"
                className={({ isActive }) =>
                  isActive
                    ? 'block mt-4 sm:mt-0 text-gray-800 font-semibold border-b-2 border-red-600'
                    : 'block mt-4 sm:mt-0 text-gray-600 hover:text-gray-800'
                }
              >
                Products
              </NavLink>
            </li>
            <li className="mb-4">
              <NavLink
                to="/about"
                className={({ isActive }) =>
                  isActive
                    ? 'block mt-4 sm:mt-0 text-gray-800 font-semibold border-b-2 border-red-600'
                    : 'block mt-4 sm:mt-0 text-gray-600 hover:text-gray-800'
                }
              >
                About Us
              </NavLink>
            </li>
            <li className="mb-4">
              <NavLink
                to="/how-it-works"
                className={({ isActive }) =>
                  isActive
                    ? 'block mt-4 sm:mt-0 text-gray-800 font-semibold border-b-2 border-red-600'
                    : 'block mt-4 sm:mt-0 text-gray-600 hover:text-gray-800'
                }
              >
                Contact
              </NavLink>
            </li>
          </ul>
        </div>
        <div className="flex items-center mx-5">
        <button className="font-poppins cursor-pointer text-lg m-5 border text-black dark:text-white bg-white dark:bg-gray-800 border-gray-400 dark:border-gray-600 rounded-3xl px-4 py-1 hover:text- active:bg-slate-200 dark:active:bg-slate-700" style={{ backgroundColor: '#347576' }}>
      <NavLink to="/login" className="hover:text-#f48908 dark:hover:text-#f48908">
        Login
      </NavLink>
    </button>

        </div>
      </div>
    </nav>
  );
};

export default Navbar;
