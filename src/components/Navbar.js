import React, { useEffect, useState } from 'react';
import { FaBell } from "react-icons/fa";
import { Link, useNavigate } from 'react-router-dom';

function Navbar() {
    const navigate = useNavigate();
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const [isLoggedOut, setIsLoggedOut] = useState(true);
    const [username, setUsername] = useState("")
    const handleLogout = () => {
        setIsDropdownOpen(false)
        if (localStorage.getItem("userId")) {
            localStorage.removeItem("userId");
            localStorage.removeItem("username");
            setIsLoggedOut(true);
            navigate('/login');
        }
    };

    const handleLogin=()=>{
        setIsLoggedOut(false)
        setIsDropdownOpen(false)
        navigate('/login');
    }
    useEffect(() => {
        if (localStorage.getItem('username')) {
            const storedUsername = localStorage.getItem('username')
            setUsername(storedUsername)
        }
    }, [])


    return (
        <div className='flex flex-row justify-between border-b-[1px]'>
            <div className='bg-[#F1F2F7] w-[15%] flex justify-center items-center '>
                <Link to={'/'} className='text-primaryColor font-bold'>INCLUSIONE</Link>
            </div>

            <div className='w-[85%] p-4 px-10 flex items-center gap-5 justify-end'>
                <div className='relative'>

                    <button onClick={() => setIsDropdownOpen(!isDropdownOpen)} className='flex items-center gap-2'>
                        <img src="/img.jpeg" alt="User Avatar" className='w-8 h-8 rounded-full' />
                        <p>{username ? username : "User"}</p>
                    </button>


                    {isDropdownOpen && (
                        !isLoggedOut ?
                            <div className='absolute right-0 mt-2 w-48 bg-white border rounded-md shadow-lg'>
                                <button
                                    onClick={handleLogout}
                                    className='block w-full text-left px-4 py-2 text-sm hover:bg-gray-200'>
                                    Logout
                                </button>
                            </div>
                            :
                            <div className='absolute right-0 mt-2 w-48 bg-white border rounded-md shadow-lg'>
                               
                                    <button
                                        onClick={handleLogin}
                                        className='block w-full text-left px-4 py-2 text-sm hover:bg-gray-200'>
                                        Login
                                    </button>
                                
                            </div>
                    )}

                </div>

                <div className="relative">
                    <FaBell className="text-gray-400 cursor-pointer" />
                    <span className="absolute top-0 right-0 block w-1.5 h-1.5 bg-red-600 rounded-full ring-2 ring-white"></span>
                </div>
            </div>
        </div>
    );
}

export default Navbar;