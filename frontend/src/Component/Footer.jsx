
import React from 'react';
import BrandIcon from '../assets/logo.png';
import { NavLink, useNavigate } from 'react-router-dom';

const Footer = () => {
    const navigate = useNavigate();
    const handleClick = () => {
        navigate('/');
    };

    return (
        <footer className="bg-[#347576] text-white py-6">
            <div className="container mx-auto px-4 flex justify-between items-center">
                <div className="flex items-center space-x-4">
                    <img
                        onClick={handleClick}
                        src={BrandIcon}
                        alt="Icon"
                        className="cursor-pointer w-60"
                    />
                    <div>
                        <span className="text-xl text-[#f48908] font-bold block">Xxxxxxxxx Pustak Pasal</span>
                        <p className="text-lg">Whether you're a book lover, a sports enthusiast, or someone looking for quality stationery,<br/> we have something special for everyone.</p>
                    </div>
                </div>
                <div className="flex space-x-6">
                    <NavLink
                        to="/"
                        className={({ isActive }) =>
                            isActive ? "text-white" : "hover:text-[#f48908]"
                        }
                    >
                        Home
                    </NavLink>
                    <NavLink
                        to="/about"
                        className={({ isActive }) =>
                            isActive ? "text-white" : "hover:text-[#f48908]"
                        }
                    >
                        About
                    </NavLink>
                    <NavLink
                        to="/contact"
                        className={({ isActive }) =>
                            isActive ? "text-white" : "hover:text-[#f48908]"
                        }
                    >
                        Contact
                    </NavLink>
                </div>
            </div>
            <div className="container mx-auto px-4 mt-4 text-center">
                <p className="text-sm">&copy; {new Date().getFullYear()} Xxxxxxxxx Pustak Pasal | All rights reserved.</p>
            </div>
        </footer>
    );
};

export default Footer;
