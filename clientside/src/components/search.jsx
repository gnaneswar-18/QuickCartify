import React, { useEffect, useState } from 'react';
import { IoMdSearch } from "react-icons/io";
import { useLocation, useNavigate } from 'react-router-dom';
import { TypeAnimation } from 'react-type-animation';

const SearchBar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [isSearchPage, setIsSearchPage] = useState(false);
  const [searchInput, setSearchInput] = useState('');

  useEffect(() => {
    setIsSearchPage(location.pathname === "/search");
  }, [location.pathname]);

  const handleInputChange = (e) => {
    const value = e.target.value;
    setSearchInput(value);
    navigate(`/search?q=${value}`);
  };

  const handlePlaceholderClick = () => {
    navigate("/search?q=");
  };

  return (
    <div className='w-full bg-gray-200 min-w-[500px] h-14 rounded-lg py-2 px-2 group focus-within:border-primary-dark'>
      <div className='flex justify-start items-center px-4 w-full h-full'>
        <button className='flex justify-center items-center group-focus-within:text-primary-dark'>
          <IoMdSearch size={30} />
        </button>
        {!isSearchPage ? (
          <div onClick={handlePlaceholderClick} className='text-center px-4 py-1 h-full text-gray-500 cursor-text'>
            <TypeAnimation
              sequence={[
                'search for milk',
                1000,
                'search for paneer',
                1000,
                'search for vegetables',
                1000,
                'search for aata',
                1000
              ]}
              wrapper="span"
              speed={50}
              repeat={Infinity}
            />
          </div>
        ) : (
          <input
            type="text"
            placeholder="Search..."
            value={searchInput}
            onChange={handleInputChange}
            className='flex-1 bg-transparent focus:outline-none w-full px-4 py-2 h-full'
          />
        )}
      </div>
    </div>
  );
};

export default SearchBar;
