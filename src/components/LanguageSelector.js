import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { FaChevronDown } from 'react-icons/fa'; // Import an icon for dropdown arrow

const LanguageSelector = () => {
    const { i18n } = useTranslation();
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);

    const languages = [
        { code: 'en', name: 'English', flag: '🇬🇧' },
        { code: 'it', name: 'Italiano', flag: '🇮🇹' }
    ];

    const toggleDropdown = () => {
        setIsDropdownOpen(prev => !prev);
    };

    const handleLanguageChange = (code) => {
        i18n.changeLanguage(code);
        setIsDropdownOpen(false); // Close dropdown after selection
    };

    return (
        <div className="flex items-center">
            <button
                onClick={toggleDropdown}
                className="flex items-center px-4 py-2 rounded-md border border-gray-300 bg-gray-200 hover:bg-gray-300 focus:outline-none"
            >
                <span>{languages.find(lang => lang.code === i18n.language)?.code}</span>
                <FaChevronDown className={`ml-2 transition-transform duration-300 ${isDropdownOpen ? 'transform rotate-180' : ''}`} />
            </button>

            {isDropdownOpen && (
                <div className="absolute right-0 mt-20 w-40 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 z-10">
                    {languages.map(lang => (
                        <button
                            key={lang.code}
                            onClick={() => handleLanguageChange(lang.code)}
                            className={`block w-full text-left px-4 py-2 text-sm ${i18n.language === lang.code ? 'bg-blue-500 text-white' : 'text-gray-800 hover:bg-gray-100'
                                }`}
                        >
                            {lang.flag} {lang.name}
                        </button>
                    ))}
                </div>
            )}
        </div>
    );
};

export default LanguageSelector;
