import React, { useEffect, useState } from "react";
import Axios from "../utils/Axios";
import summaryapi from "../common/summaryapi";
import AxiosToastError from "../utils/AxiosToastError";
import Loading from "../components/loading.jsx";
import { Link } from "react-router-dom";
import currency from "../utils/currency.jsx";
import Card from "../components/card.jsx";
const Productdisplay = ({ id }) => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchProducts = async () => {
    try {
      setLoading(true);
      const response = await Axios({
        ...summaryapi.getproductbycategory,
        data: { id: id },
      });
      setData(response.data.data);
    } catch (error) {
      AxiosToastError(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (id) {
      fetchProducts();
    }
  }, [id]);

  return (
    <div className="p-4">
      {loading ? (
        <Loading></Loading>
      ) : data.length === 0 ? (
        <p className="text-gray-500">No products available</p>
      ) : (
        <div className="flex gap-4 overflow-x-auto max-h-72 p-2 scrollbar">
          {data.map((product) => (
             <Card product={product} key={product._id}></Card>
          ))}
        </div>
      )}
    </div>
  );
};

export default Productdisplay;
