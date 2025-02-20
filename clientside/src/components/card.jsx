import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import currency from '../utils/currency'
import Addtocardbutton from './addtocardbutton'
const Card = ({ product }) => {


    return (
        <Link to={`/product/${product._id}`} className=' bg-white rounded-xl shadow-md p-2 transition-all hover:scale-105 hover:shadow-lg cursor-pointer relative min-w-[25vh] max-w-[27vh] max-h-[40vh]'
        >
            {
                Boolean(product.discount) && (
                    <div className='bg-red-500 text-white p-1 rounded-full w-fit text-xs -rotate-45 absolute top-2 left-0 '>
                        {product.discount}% off
                    </div>
                )
            }
            <div className='h-[40%] '>
                <img src={product.image[0].url} alt={product.name} className='w-full h-full object-scale-down ' />
            </div>
            <div className='bg-green-50 text-green-800 w-fit py-1 px-2 rounded-full text-center text-sm'>
                {product.unit}
            </div>
            <div className='p-2 font-medium text-ellipsis line-clamp-2'>
                {product.name}
            </div>
            <div className=' flex items-end justify-between gap-2 mt-1 '>
                <div className='w-fit  bg-blue-50 p-2'>
                    {currency(product.price)}
                </div>
                <div>
                    {
                        product.stock == 0 ? (
                            <p className='tex-sm  text-center text-red-400'>out of stock</p>
                        ) : (

                            <Addtocardbutton data={product}></Addtocardbutton>
                        )
                    }
                </div>

            </div>

        </Link>
    )
}

export default Card
