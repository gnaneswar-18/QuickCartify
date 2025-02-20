import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import AxiosToastError from "../utils/AxiosToastError";
import Axios from "../utils/Axios";
import summaryapi from "../common/summaryapi";
import currency from "../utils/currency.jsx";
import Card from "../components/card.jsx";

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
    <section className="container mx-auto p-4 grid grid-cols-6 xl:grid-cols-6 gap-4">
      {products.length === 0 ? (
        <div className="col-span-full text-center text-gray-500">
          <p>No products available</p>
        </div>
      ) : (
        products.map((product) => (
          <Card product={product} key={product._id}></Card>
        ))
      )}
    </section>
  );
};

export default Productlist;
