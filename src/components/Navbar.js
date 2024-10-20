import React, { useContext, useState, useEffect } from 'react';
import { FaBell, FaChevronDown, FaBars } from "react-icons/fa";
import { Link, useNavigate } from 'react-router-dom';
import AppContext from '../AppContext';

const Navbar = ({ toggleSidebar, isSidebarExpanded }) => {
    const navigate = useNavigate();
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [isMobile, setIsMobile] = useState(false);
    const authCtx = useContext(AppContext);

    const isLoggedIn = authCtx.isLoggedIn;
    const username = isLoggedIn ? "User" : "Guest";

    useEffect(() => {
        const handleResize = () => {
            setIsMobile(window.innerWidth <= 950);
        };

        handleResize();
        window.addEventListener('resize', handleResize);

        return () => window.removeEventListener('resize', handleResize);
    }, []);

    const handleLogout = () => {
        authCtx.logout();
        setIsDropdownOpen(false);
        setIsMobileMenuOpen(false);
        navigate('/');
    };

    const handleLogin = () => {
        setIsDropdownOpen(false);
        setIsMobileMenuOpen(false);
        navigate('/');
    };

    const toggleDropdown = () => {
        setIsDropdownOpen((prevState) => !prevState);
    };

    const toggleMobileMenu = () => {
        setIsMobileMenuOpen((prevState) => !prevState);
    };

    return (
        <nav className="bg-white shadow-sm">
            <div className="flex">
                <div className="w-[15%] bg-[#F1F2F7] flex items-center justify-center md:flex hidden ">
                    <Link to={'/'} className="text-primaryColor font-bold text-xl py-4">INCLUSIONE</Link>
                </div>
                <div className="flex-1">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="flex justify-between h-16">
                            <div className="flex items-center">
                                <button
                                    onClick={toggleSidebar}
                                    className="p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500"
                                >
                                    <span className="sr-only">Toggle sidebar</span>
                                    <FaBars className="h-6 w-6" />
                                </button>
                            </div>
                            <div className="hidden sm:ml-6 sm:flex sm:items-center">
                                <div className="ml-3 relative">
                                    <button 
                                        onClick={toggleDropdown}
                                        className="flex items-center gap-2 px-4 py-2 rounded-md transition duration-300"
                                    >
                                        <img src="/user.png" alt="User Avatar" className="w-8 h-8 rounded-full" />
                                        <span className="hidden md:inline">{username}</span>
                                        <FaChevronDown className={`ml-2 transition-transform duration-300 ${isDropdownOpen ? 'transform rotate-180' : ''}`} />
                                    </button>

                                    {isDropdownOpen && (
                                        <div className="origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg py-1 bg-white ring-1 ring-black ring-opacity-5">
                                            {isLoggedIn ? (
                                                <button
                                                    onClick={handleLogout}
                                                    className="block w-full text-left px-4 py-2 text-sm text-red-500 hover:bg-gray-100"
                                                >
                                                    Logout
                                                </button>
                                            ) : (
                                                <button
                                                    onClick={handleLogin}
                                                    className="block w-full text-left px-4 py-2 text-sm text-blue-500 hover:bg-gray-100"
                                                >
                                                    Login
                                                </button>
                                            )}
                                        </div>
                                    )}
                                </div>
                            </div>
                            <div className="-mr-2 flex items-center sm:hidden">
                                <button
                                    onClick={toggleMobileMenu}
                                    className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500"
                                >
                                    <span className="sr-only">Open main menu</span>
                                    <FaBars className="block h-6 w-6" />
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {isMobileMenuOpen && (
                <div className="sm:hidden">
                    <div className="pt-4 pb-3 border-t border-gray-200">
                        <div className="flex items-center px-4">
                            <div className="flex-shrink-0">
                                <img className="h-10 w-10 rounded-full" src="/user.png" alt="User avatar" />
                            </div>
                            <div className="ml-3">
                                <div className="text-base font-medium text-gray-800">{username}</div>
                            </div>
                        </div>
                    </div>
                    <div className="pt-2 pb-3 space-y-1">
                        <button
                            onClick={isLoggedIn ? handleLogout : handleLogin}
                            className="block w-full text-left px-4 py-2 text-base text-red-500 font-medium  hover:text-gray-800 hover:bg-gray-100"
                        >
                            {isLoggedIn ? 'Logout' : 'Login'}
                        </button>
                    </div>
                </div>
            )}
        </nav>
    );
};

export default Navbar;