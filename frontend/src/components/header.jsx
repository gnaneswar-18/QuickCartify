import React, { useState } from 'react';
import Search from '../components/search.jsx'
import { Link } from 'react-router-dom';
import UserMenu from '../components/usermenu.jsx';
import { FaShoppingCart } from "react-icons/fa";
import { VscTriangleDown, VscTriangleUp } from "react-icons/vsc";
import { useSelector } from 'react-redux'

const Header = () => {
  const user = useSelector(state => state.user);
  const [openusermenu, setusermenu] = useState(false);
  
  const close = () => { setusermenu(false); };

  return (
    <>
    
      {openusermenu && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-10"
          onClick={close} 
        ></div>
      )}

      <header className="h-[10vh] shadow-lg flex justify-between items-center bg-white relative z-20">
        <Link to={"/"} className="h-full px-4 ">
          <img
            
            src="https://res-console.cloudinary.com/dlbwjhoid/media_explorer_thumbnails/598ff56b0a0bf200135c8fd34126c124/detailed"
            alt="logo"
            className="h-full w-48 object-contain"
          />
        </Link>
        <div>
          <Search />
        </div>
        <div className='mx-2 px-6 py-1 flex justify-center items-center gap-3'>
          <div className='border border-stone-500 p-2 rounded relative'>
            {
              user?._id ? (
                <div className='relative'>
                  <div className='flex items-center gap-2 cursor-pointer font-medium' onClick={() => setusermenu(!openusermenu)}>
                    <p>Account</p>
                    {openusermenu ? <VscTriangleUp size={25} /> : <VscTriangleDown size={25} />}
                  </div>

                  {openusermenu && (
                    <div className='absolute right-0 top-14 bg-white shadow-lg rounded p-4 min-w-72 z-30'>
                      <UserMenu close={close} />
                    </div>
                  )}
                </div>
              ) : (
                <Link to={"/login"} className="text-xl font-medium">Login</Link>
              )
            }
          </div>
          <div className='flex justify-center items-center gap-1 bg-green-700 rounded px-2 py-1'>
            <div className='animate-bounce'>
              <FaShoppingCart size={26} />
            </div>
            <div className='flex flex-col text-center items-center p-2'>
              <p className='font-semibold'>Mycart</p>
            </div>
          </div>
        </div>
      </header>
    </>
  );
};

export default Header;
