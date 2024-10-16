import React, { useContext, useState } from 'react';
import { FaBell, FaChevronDown } from "react-icons/fa";
import { Link, useNavigate } from 'react-router-dom';
import AppContext from '../AppContext';

function Navbar() {
    const navigate = useNavigate();
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const authCtx = useContext(AppContext);

    const isLoggedIn = authCtx.isLoggedIn;
    const username = isLoggedIn ? "User" : "Guest";

    const handleLogout = () => {
        authCtx.logout();
        setIsDropdownOpen(false);
        navigate('/');
    };

    const handleLogin = () => {
        setIsDropdownOpen(false);
        navigate('/');
    };

    const toggleDropdown = () => {
        setIsDropdownOpen((prevState) => !prevState);
    };

    return (
        <div className='flex flex-row justify-between border-b-[1px] bg-white shadow-sm'>
            <div className='bg-[#F1F2F7] w-[15%] flex justify-center items-center py-4'>
                <Link to={'/'} className='text-primaryColor font-bold'>INCLUSIONE</Link>
            </div>

            <div className='w-[85%] p-4 px-10 flex items-center gap-5 justify-end'>
                <div className='relative'>
                    <button 
                        onClick={toggleDropdown} 
                        className='flex items-center gap-2  px-4 py-2 rounded-md transition duration-300'
                    >
                        <img src="/img.jpeg" alt="User Avatar" className='w-8 h-8 rounded-full' />
                        <span>{username}</span>
                        <FaChevronDown className={`ml-2 transition-transform duration-300 ${isDropdownOpen ? 'transform rotate-180' : ''}`} />
                    </button>

                    {isDropdownOpen && (
                        <div className="absolute right-0 mt-2 py-2 w-48 bg-white border rounded-md shadow-lg z-10">
                            {isLoggedIn ? (
                                <>
                                    <button
                                        onClick={handleLogout}
                                        className='block w-full text-left px-4 py-2 text-red-500 hover:bg-gray-100'>
                                        Logout
                                    </button>
                                </>
                            ) : (
                                <button
                                    onClick={handleLogin}
                                    className='block w-full text-left px-4 py-2 text-blue-500 hover:bg-gray-100'>
                                    Login
                                </button>
                            )}
                        </div>
                    )}
                </div>

                {isLoggedIn && (
                    <div className="relative">
                        <FaBell className="text-gray-400 cursor-pointer text-xl" />
                        <span className="absolute top-0 right-0 block w-2 h-2 bg-red-600 rounded-full ring-2 ring-white"></span>
                    </div>
                )}
            </div>
        </div>
    );
}

export default Navbar;