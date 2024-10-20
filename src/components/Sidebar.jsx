import React, { useState, useEffect } from 'react';
import { BsInfoSquare } from 'react-icons/bs';
import { CiFolderOn, CiUser } from 'react-icons/ci';
import { FaRobot } from 'react-icons/fa';
import { IoSettings } from 'react-icons/io5';
import { MdOutlineInsertChart, MdMenu } from 'react-icons/md';
import { Link, useLocation } from 'react-router-dom';

function Sidebar({isMenuExpanded}) {
    const location = useLocation();
    const [isExpanded, setIsExpanded] = useState(true);
    const [isMobile, setIsMobile] = useState(false);

    useEffect(() => {
        const handleResize = () => {
            setIsMobile(window.innerWidth <= 950);
            setIsExpanded(window.innerWidth > 950);
        };

        handleResize();
        window.addEventListener('resize', handleResize);

        return () => window.removeEventListener('resize', handleResize);
    }, []);

    const isActive = (path) => location.pathname === path;

    const toggleSidebar = () => {
        setIsExpanded(!isExpanded);
    };

    const MenuItem = ({ to, icon, text }) => (
        <Link to={to} className={`flex items-center p-2 rounded-lg ${isActive(to) ? 'bg-[#707FDD] text-primaryColor bg-opacity-10' : 'text-secondaryColor hover:bg-[#707FDD] hover:bg-opacity-10 hover:text-primaryColor'}`}>
            <span className="text-xl mr-2">{icon}</span>
            {isExpanded && isMenuExpanded && <span>{text}</span>}
        </Link>
    );

    return (
        <div className={`flex flex-col min-h-[90vh] px-4 bg-[#F1F2F7] text-white transition-all duration-300 ${isExpanded &&  isMenuExpanded  ? 'w-[15%]' : 'w-16'} ${isMobile ? 'absolute z-10' : 'relative'}`}>
            <div className="flex items-center justify-between ps-4 pt-4">
                {isExpanded && isMenuExpanded &&(
                    <div className="px-0 py-0 text-gray-400 uppercase text-md">
                    Menu
                </div>
                )}
                <button onClick={toggleSidebar} className={`text-2xl text-secondaryColor ${isMobile ? 'absolute top-4 right-4' : ''}`}>
                    <MdMenu />
                </button>
            </div>
            <nav className="flex-grow flex flex-col gap-1">
                <MenuItem to="/" icon={<MdOutlineInsertChart />} text="Dashboard" />
                <MenuItem to="/all" icon={<CiFolderOn />} text="All" />
                <MenuItem to="/bu1" icon={<CiFolderOn />} text="BU 1" />
                <MenuItem to="/bu2" icon={<CiFolderOn />} text="BU 2" />
                <MenuItem to="/bu3" icon={<CiFolderOn />} text="BU 3" />
                <MenuItem to="/chat" icon={<FaRobot />} text="ChatBot" />
                {isExpanded && isMenuExpanded && (
                    <div className="px-2 py-2 text-gray-400 uppercase text-md">
                        Other
                    </div>
                )}
                <MenuItem to="/settings" icon={<IoSettings />} text="Settings" />
                <MenuItem to="/accounts" icon={<CiUser />} text="Accounts" />
                <MenuItem to="/help" icon={<BsInfoSquare />} text="Help" />
            </nav>
        </div>
    );
}

export default Sidebar;