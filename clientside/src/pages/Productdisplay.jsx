import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Axios from "../utils/Axios";
import summaryapi from "../common/summaryapi";
import AxiosToastError from "../utils/AxiosToastError";
import currency from "../utils/currency.jsx";
import Divider from '../components/divider.jsx'
import { FaBolt, FaTags, FaThLarge } from "react-icons/fa";
import { discountprice } from "../utils/discountprice.jsx";
import AddToCartButton from "../components/addtocardbutton.jsx";
const Productdisplay = () => {
  const { id } = useParams();
  const [data, setData] = useState({});
  const [image, setImage] = useState(null);

  const fetchProduct = async () => {
    try {
      const res = await Axios({
        ...summaryapi.getproductbyid,
        data: { id },
      });

      if (res.data.success) {
        setData(res.data.data);
        setImage(res.data.data.image?.[0]?.url || "");
      }
    } catch (error) {
      AxiosToastError(error);
    }
  };

  useEffect(() => {
    fetchProduct();
  }, [id]);

  return (
    <section className="container mx-auto px-6 py-3 gap-2 grid grid-cols-5 ">

      <div className="col-span-3">
        <div className="bg-white rounded min-h-[60vh] max-h-[60vh] h-full w-full flex justify-center items-center mb-2 shadow">
          {image ? (
            <img
              src={image}
              alt="Product"
              className="h-full w-full object-scale-down "
            />
          ) : (
            <p className="text-gray-500">No Image Available</p>
          )}
        </div>
        <div className=" p-4 flex  justify-center  gap-2 overflow-x-auto scrollbar  ">
          {data.image?.length > 0 ? (
            data.image.map((img, index) => (
              <img
                src={img.url}
                key={index}
                className="h-20 w-20 rounded-lg cursor-pointer border-2 border-transparent bg-slate-200 hover:border-blue-500"
                onClick={() => setImage(img.url)}
              />
            ))
          ) : (
            <p className="text-gray-500">No Thumbnails Available</p>
          )}
        </div>
        <div className="my-4 grid gap-3">
          <div>
            <h2 className="font-bold text-xl">DESCRIPTION</h2>
            <p className="text-gray-600 text-md">Lorem ipsum dolor sit amet consectetur adipisicing elit. Dignissimos ut eum, quaerat possimus magni cum! Sit veniam sapiente unde placeat impedit nostrum ipsam dolores deserunt excepturi, obcaecati rerum consequuntur esse.</p>
          </div>
        
        </div>
      </div>
      <div className="p-6 min-h-[70vh]  rounded-xl  col-span-2">
        <h2 className="text-xl font-bold mb-2">{data.name}</h2>
        <span className="mr-2 border rounded-full w-fit p-1 bg-gray-50">⏱️ 8 MINS</span>
        <Divider></Divider>
        <div className="flex justify-between items-center gap-3 mt-4">
          <div>
            <p className="text-gray-700 text-lg">{data.unit}</p>
            {
              data.discount ? (
                <p className="text-lg font-bold ">
                  <span>MRP {discountprice(data.price, data.discount)}</span>
                  <span className="text-gray-500 line-through ml-1">{currency(data.price)}</span>
                </p>) : (
                <p className="text-lg font-bold">MRP ₹31</p>
              )
            }
            <p className="text-gray-500 text-sm">(Inclusive of all taxes)</p>
          </div>
          {
            data.stock == 0 ? (
              <p className="text-red-500 text-md">Out of Stock</p>
            ) : (
              <AddToCartButton data={data}></AddToCartButton>
            )
          }
        </div>
        <Divider></Divider>

        <div className="mt-6">
          <h3 className="text-lg font-semibold">Why shop from QuickCartify?</h3>
          <div className="mt-3 space-y-3">
            <div className="flex items-start  ">
              <FaBolt className="text-yellow-500 text-xl mr-3" />
              <div>
                <h4 className="font-semibold">Superfast Delivery</h4>
                <p className="text-gray-600 text-md">Get your order delivered to your doorstep at the earliest from dark stores near you. No more waiting in queues or stepping out of your home for essentials.</p>
              </div>
            </div>
            <div className="flex items-start">
              <FaTags className="text-yellow-500 text-xl mr-3" />
              <div>
                <h4 className="font-semibold">Best Prices & Offers</h4>
                <p className="text-gray-600 text-md">Best price destination with offers directly from the manufacturers. Enjoy exclusive discounts and special deals that help you save more on your purchases.</p>
              </div>
            </div>
            <div className="flex items-start">
              <FaThLarge className="text-yellow-500 text-xl mr-3" />
              <div>
                <h4 className="font-semibold">Wide Assortment</h4>
                <p className="text-gray-600 text-md">Choose from 5000+ products across food, personal care, household & other categories. Whether you need groceries, dairy products, or daily essentials, we have it all in one place.</p>

              </div>
            </div>
          </div>
        </div>
      </div>




    </section>
  );
};

export default Productdisplay;
