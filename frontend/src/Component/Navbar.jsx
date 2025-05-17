import React, { useState, useContext } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { FaUser, FaShoppingCart } from 'react-icons/fa';
import HamburgerIcon from '../assets/hamburger.png';
import BrandIcon from '../assets/logo.png';
import AuthContext from '../Context/AuthContext';
import { ShopContext } from '../Context/ShopContext';

const navLinks = [
  { to: '/', label: 'Home' },
  { to: '/product', label: 'Products' },
  { to: '/about', label: 'About Us' },
  { to: '/free_products', label: 'Free Products' },
  { to: '/contact', label: 'Contact' },
];

const Navbar = () => {
  const [showNavbar, setShowNavbar] = useState(false);
  const { isAuthenticated } = useContext(AuthContext);
  const { cartItem } = useContext(ShopContext);
  const navigate = useNavigate();

  const cartCount = Object.values(cartItem).reduce((sum, qty) => sum + qty, 0);
  console.log(cartCount);
  const toggleNavbar = () => setShowNavbar(prev => !prev);

  const renderNavLinks = (mobile = false) =>
    navLinks.map(({ to, label }) => (
      <li key={to} className={mobile ? 'mb-4' : 'mr-6'}>
        <NavLink
          to={to}
          className={({ isActive }) =>
            isActive
              ? 'block text-gray-800 font-semibold border-b-2 border-red-600'
              : 'block text-gray-600 hover:text-gray-800'
          }
        >
          {label}
        </NavLink>
      </li>
    ));

  return (
    <nav className="bg-white shadow-lg">
      <div className="container mx-auto px-4 flex justify-between items-center h-16">
        {/* Brand */}
        <img
          onClick={() => navigate('/')}
          src={BrandIcon}
          alt="Brand"
          className="cursor-pointer w-60"
        />

        {/* Desktop Links */}
        <ul className="hidden sm:flex flex-grow justify-center text-sm list-none p-4 sm:p-0 mt-4 sm:mt-0">
          {renderNavLinks()}
        </ul>

        {/* Hamburger Icon */}
        <button
          onClick={toggleNavbar}
          className="block sm:hidden px-3 py-2 border rounded text-gray-600 border-gray-400 hover:text-gray-800 hover:border-gray-500"
        >
          <img src={HamburgerIcon} alt="Menu" className="w-10" />
        </button>

        {/* Mobile Links */}
        {showNavbar && (
          <ul className="sm:hidden w-full flex flex-col items-center text-sm list-none p-4 mt-4">
            {renderNavLinks(true)}
          </ul>
        )}

        {/* Auth & Cart */}
        <div className="flex items-center mx-5">
          {isAuthenticated ? (
            <>
              <NavLink to="/logout" className="mx-2">
                <button className="font-poppins text-lg text-black hover:text-gray-800 active:bg-slate-200 dark:active:bg-slate-700">
                  Logout
                </button>
              </NavLink>
              <NavLink to="/cart" className="mx-2">
                <FaShoppingCart
                  size={24}
                  className={cartCount > 0 ? 'text-red-600' : 'text-gray-600'}
                />
              </NavLink>
              <NavLink to="/account" className="text-gray-600 hover:text-[#f48908] mx-2">
                <FaUser size={24} />
              </NavLink>
            </>
          ) : (
            <NavLink
              to="/login"
              className="font-poppins text-lg text-black hover:text-gray-800 active:bg-slate-200 dark:active:bg-slate-700"
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
