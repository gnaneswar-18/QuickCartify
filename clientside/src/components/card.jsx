import React from 'react';
import { Link } from 'react-router-dom';
import currency from '../utils/currency';
import Addtocardbutton from './addtocardbutton';

const Card = ({ product }) => {
  return (
    <Link
      to={`/product/${product._id}`}
      className="bg-white rounded-2xl shadow-md p-3 transition-transform hover:scale-105 hover:shadow-lg cursor-pointer relative min-w-[25vh] max-w-[28vh] max-h-[42vh] flex flex-col justify-between"
    >
      {/* Discount Badge */}
      {Boolean(product.discount) && (
        <div className="absolute top-2 left-2 bg-red-500 text-white text-xs px-2 py-1 rounded-full shadow-sm">
          {product.discount}% OFF
        </div>
      )}

      {/* Image */}
      <div className="h-[38%] flex items-center justify-center mb-2">
        <img
          src={product.image[0]?.url || 'placeholder.jpg'}
          alt={product.name}
          className="w-full h-full object-contain rounded-md"
        />
      </div>

      {/* Unit */}
      <div className="bg-green-100 text-green-800 text-xs font-semibold w-fit px-2 py-1 rounded-full mb-1">
        {product.unit}
      </div>

      {/* Product Name */}
      <div className="text-sm font-medium line-clamp-2 leading-tight mb-1">
        {product.name}
      </div>

      {/* Price + Action */}
      <div className="flex items-center justify-between mt-auto">
        <div className="text-blue-700 bg-blue-50 px-2 py-1 rounded font-semibold text-sm">
          {currency(product.price)}
        </div>
        <div>
          {product.stock === 0 ? (
            <p className="text-xs text-red-500">Out of stock</p>
          ) : (
            <Addtocardbutton data={product} />
          )}
        </div>
      </div>
    </Link>
  );
};

export default Card;
