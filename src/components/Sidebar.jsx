import React from 'react'
import { BsInfoSquare } from 'react-icons/bs'
import { CiFolderOn, CiUser } from 'react-icons/ci'
import { IoSettings } from 'react-icons/io5'
import { MdOutlineInsertChart } from 'react-icons/md'
import { Link, useLocation } from 'react-router-dom'

function Sidebar() {
    const location = useLocation(); // To track the current active route

    // Function to check if the current path is active
    const isActive = (path) => location.pathname === path;

    return (
        <div className='w-[15%] bg-[#F1F2F7] min-h-screen px-7 pt-8'>
            <div>
                <p className='uppercase text-secondaryColor font-normal text-sm ms-3'>Menu</p>
                <div className='mt-3 flex flex-col gap-1'>
                    {/* Dashboard Link */}
                    <Link to={'/'} className={`flex gap-2 cursor-pointer p-3 rounded-md ${isActive('/') ? 'bg-[#707FDD] text-primaryColor bg-opacity-10' : 'text-secondaryColor hover:bg-[#707FDD] hover:bg-opacity-10 hover:text-primaryColor'}`}>
                    <MdOutlineInsertChart />

                        <span className="text-sm">Dashboard</span>
                    </Link>
                    {/* All Link */}
                    <Link to={'/all'} className={`flex gap-2 cursor-pointer p-3 rounded-md ${isActive('/all') ? 'bg-[#707FDD] text-primaryColor bg-opacity-10' : 'text-secondaryColor hover:bg-[#707FDD] hover:bg-opacity-10 hover:text-primaryColor'}`}>
                    <CiFolderOn />

                        <span className="text-sm">All</span>
                    </Link>
                    {/* BU 1, 2, 3 Links */}
                    <p className='flex gap-2 text-secondaryColor cursor-pointer  hover:bg-[#707FDD] hover:bg-opacity-10 p-3 rounded-md hover:text-primaryColor'>
                    <MdOutlineInsertChart />

                        <span className="text-sm">BU 1</span>
                    </p>
                    <p className='flex gap-2 text-secondaryColor cursor-pointer hover:text-primaryColor hover:bg-[#707FDD] hover:bg-opacity-10 p-3 rounded-md'>
                    <MdOutlineInsertChart />

                        <span className="text-sm">BU 2</span>
                    </p>
                    <p className='flex gap-2 text-secondaryColor cursor-pointer hover:text-primaryColor hover:bg-[#707FDD] hover:bg-opacity-10 p-3 rounded-md'>
                    <MdOutlineInsertChart />

                        <span className="text-sm">BU 3</span>
                    </p>
                </div>
            </div>

            <div>
                <p className='uppercase text-secondaryColor font-normal text-sm ms-3 mt-10'>Other</p>
                <div className='mt-3'>
                    {/* Settings, Accounts, and Help Links */}
                    <p className='flex gap-2 items-center text-secondaryColor hover:text-primaryColor cursor-pointer hover:bg-[#707FDD] hover:bg-opacity-10 p-3 rounded-md'>
                        <IoSettings />
                        <span className="text-sm">Settings</span>
                    </p>
                    <p className='flex gap-2 items-center text-secondaryColor hover:text-primaryColor cursor-pointer hover:bg-[#707FDD] hover:bg-opacity-10 p-3 rounded-md'>
                        <CiUser />
                        <span className="text-sm">Accounts</span>
                    </p>
                    <p className='flex gap-2 items-center text-secondaryColor hover:text-primaryColor cursor-pointer hover:bg-[#707FDD] hover:bg-opacity-10 p-3 rounded-md'>
                        <BsInfoSquare />
                        <span className="text-sm">Help</span>
                    </p>
                </div>
            </div>
        </div>
    );
}

export default Sidebar;
