import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import AxiosToastError from "../utils/AxiosToastError";
import Axios from "../utils/Axios";
import summaryapi from "../common/summaryapi";
import currency from "../utils/currency.jsx";

const Productlist = () => {

  const [products, setProducts] = useState([]);
  const {id}=useParams()

  const fetchProducts = async () => {
  
    try {
      const response = await Axios({
        ...summaryapi.getproductbycategory,
        data:{id:id}
       
      });
      setProducts(response.data.data);
    } catch (error) {
      AxiosToastError(error);
    }
  };

  useEffect(() => {
    if (id) {
      fetchProducts(); 
    }
  }, [id]);

  return (
    <section className="container mx-auto p-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-4">
      {products.length === 0 ? (
        <div className="col-span-full text-center text-gray-500">
          <p>No products available</p>
        </div>
      ) : (
        products.map((product) => (
          <Link
            key={product._id}
            to={`/product/${product._id}`}
            className="max-w-56 max-h-72 border rounded-xl grid gap-1 bg-white shadow-md hover:shadow-lg p-2 pt-4 relative"
          
          >
            {Boolean(product.discount) && (
              <div className="bg-red-500 text-white p-1 rounded-full w-fit text-xs -rotate-45 absolute top-5 left-1">
                {product.discount}% off
              </div>
            )}

            <div className="max-h-28 flex justify-center items-center">
              <img
                src={product.image[0]?.url || "placeholder.jpg"}
                alt={product.name}
                className="w-full h-full object-contain"
              />
            </div>

            <div className="bg-green-50 text-green-800 w-fit py-1 px-2 rounded-full text-center text-sm">
              {product.unit}
            </div>

            <div className="p-2 font-bold text-ellipsis line-clamp-2">
              {product.name}
            </div>

            <div className="flex items-center justify-between gap-2">
              <div className="w-fit bg-blue-50 p-2 text-blue-700 font-semibold">
                {currency(product.price)}
              </div>

              <div>
                {product.stock === 0 ? (
                  <p className="text-sm text-center text-red-400">Out of stock</p>
                ) : (
                  <button className="bg-green-500 text-white px-4 py-1 rounded hover:bg-green-700 transition">
                    Add
                  </button>
                )}
              </div>
            </div>
          </Link>
        ))
      )}
    </section>
  );
};

export default Productlist;
