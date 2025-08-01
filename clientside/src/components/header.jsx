import React, { useEffect, useState } from 'react';
import Search from '../components/search.jsx'
import { Link } from 'react-router-dom';
import UserMenu from '../components/usermenu.jsx';
import { FaShoppingCart } from "react-icons/fa";
import { VscTriangleDown, VscTriangleUp } from "react-icons/vsc";
import { useSelector } from 'react-redux';
import currency from '../utils/currency.jsx'
import {discountprice} from '../utils/discountprice.jsx'
import Cart from './cart.jsx';
const Header = () => {
  const user = useSelector(state => state.user);
  const [openusermenu, setusermenu] = useState(false);
  const [opencart,setopencart]=useState(false)
  const cartitem = useSelector(state => state.cart.cartitems)
  const [cartsize,setcartsize]=useState(cartitem.length)
  const [cartprice,setcartprice]=useState(0) 
  const close = () => { setusermenu(false); };

  useEffect(() => {
    const total = (cartitem || []).reduce((prev, curr) => prev + (discountprice(curr.productId.price,curr.productId.discount) *curr.quantity), 0);
    setcartprice(total);
    const size = (cartitem || []).reduce((prev, curr) => prev + (curr.quantity), 0);
    setcartsize(size);
  }, [cartitem]);

  

  return (
    <>

      {openusermenu && (
        <div
          className="fixed inset-0 bg-neutral-900/50  "
          onClick={close}
        ></div>
      )}

      <header className="h-[10vh] shadow-lg flex justify-between items-center bg-white relative z-10">
        <Link to={"/"} className="h-full px-4 ">
          <img

            src={import.meta.env.VITE_LOGO_URL}
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
          <div onClick={()=>setopencart(true)} className='flex justify-center items-center gap-1 bg-green-700 rounded px-2 py-1 text-white'>
            <div className='animate-bounce'>
              <FaShoppingCart size={26} />
            </div>
            <div className='flex flex-col text-center items-center max-h-12  '>
              {
                cartitem[0]?(
                  <div className='text-md'>
                    <p>{cartsize} items</p>
                    <p>{currency(cartprice)}</p>
                  </div>
                ) : (
                  <p className='font-semibold p-2 text-xl'>Mycart</p>
              )
              }

            </div>
          </div>
        </div>
        {
        opencart && (
          <div
            className="fixed inset-0 bg-neutral-900/50  "
            onClick={() => setopencart(false)}
          >
            <Cart close={()=>setopencart(false)}></Cart>
          </div>
        )
      }
      </header>

      
    </>
  );
};

export default Header;
