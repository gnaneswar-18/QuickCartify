import React, { useEffect, useState } from 'react'
import { IoMdSearch } from "react-icons/io";
import { useLocation, useNavigate } from 'react-router-dom';
import { TypeAnimation } from 'react-type-animation';

const search = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const [issearch, setissearch] = useState(false);
    useEffect(() => {
        const page = location.pathname === "/search"
        setissearch(page);
    })

    const handleclick = () => {
        navigate("/search");
    }
    return (
        <div className='w-full bg-gray-200 min-w-[500px]  h-14 rounded-lg py-2 px-2  group focus-within:border-primary-dark border-2'>
            <div className='flex justify-start items-center px-4 w-full h-full border'>
                <button  className='flex justify-center items-center group-focus-within:text-primary-dark'>
                    <IoMdSearch size={30} />
                </button>
                {
                    !issearch ? (
                        <div onClick={handleclick} className='text-center px-4 py-1 h-full text-gray-500'>
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
                        <div >
                            <input type="text" placeholder='Search...' className=' border border-grenn-300 flex-1 bg-transparent focus:outline-none w-full px-4 py-2 h-full ' />
                        </div>
                    )
                }

            </div>
        </div>
    )
}

export default search
