import React, { useState, useEffect, useContext } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { FaUser, FaShoppingCart } from 'react-icons/fa';
import HamburgerIcon from '../assets/hamburger.png';
import BrandIcon from '../assets/logo.png';
import AuthContext from '../Context/AuthContext';

const Navbar = () => {
  const [showNavbar, setShowNavbar] = useState(false);
  const { isAuthenticated } = useContext(AuthContext);  // Use AuthContext directly
  const [cartItems, setCartItems] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    // Only fetch cart items if the user is authenticated
    const fetchCartItems = async () => {
      const token = localStorage.getItem('access_token');
      if (!isAuthenticated || !token) return;

      try {
        const response = await fetch('http://127.0.0.1:8000/api/cartitem/', {
          headers: {
            'Authorization': `Bearer ${token}`,
          },
        });

        if (!response.ok) throw new Error('Cart fetch failed');
        const data = await response.json();
        setCartItems(data); // Adjust if data is wrapped in a key
      } catch (error) {
        console.error('Error fetching cart:', error);
      }
    };

    fetchCartItems();
  }, [isAuthenticated]);  // This hook depends on authentication status

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
            <li className="mb-4">
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
        <div className="flex items-center mx-5">
          {isAuthenticated ? (
            <>
              <NavLink to="/logout" className="mx-2">
                <button
                  className="font-poppins cursor-pointer text-lg text-black dark:text-black hover:text- active:bg-slate-200 dark:active:bg-slate-700"
                >
                  Logout
                </button>
              </NavLink>
              <NavLink to="/cart" className="mx-2">
                <FaShoppingCart
                  size={24}
                  className={cartItems.length > 0 ? 'text-red-600' : 'text-gray-600'}
                />
              </NavLink>
              <NavLink to="/account" className="text-gray-600 hover:text-[#f48908] mx-2">
                <FaUser size={24} />
              </NavLink>
            </>
          ) : (
            <NavLink
              to="/login"
              className="font-poppins cursor-pointer text-lg text-black dark:text-black hover:text- active:bg-slate-200 dark:active:bg-slate-700"
            >
              Login
            </NavLink>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
