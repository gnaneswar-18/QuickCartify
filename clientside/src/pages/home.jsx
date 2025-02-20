import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Navigation, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Productinfo from "./productinfo";


const Home = () => {
  const categorydata = useSelector((state) => state.product.allcategory);

  const navigate = useNavigate()
  const handleclick = (id) => {
    navigate(`/productlist/${id}`)

  }
  return (
    <section>

      <div className="w-full flex justify-center p-2 ">
        <Swiper
          modules={[Autoplay, Navigation, Pagination]}
          autoplay={{ delay: 3000, disableOnInteraction: false }}
          loop={true}
          // navigation
          pagination={{ clickable: true }}
          className="w-[95%] h-[40vh] rounded-lg relative "
        >
          <SwiperSlide>
            <img src="./banner2.png" alt="Banner 2" className="w-full  object-fit rounded-3xl" />
          </SwiperSlide>
          
          <SwiperSlide>
            <img src="./banner4.png" alt="Banner 4" className="w-full  object-fit rounded-3xl" />
          </SwiperSlide>
          <SwiperSlide>
            <img src="./banner3.png" alt="Banner 3" className="w-full  object-cover rounded-lg" />
          </SwiperSlide>
        </Swiper>
      </div>


      <div className="mt-10 px-6  py-6 rounded-lg">
        <h2 className="font-semibold text-3xl p-2">Top Categories</h2>
        <div className="grid grid-cols-10  gap-6">
          {categorydata.map((cat) => (
            <div
              key={cat._id}
              className="bg-white p-4 rounded-xl shadow-md transition-all hover:scale-105 hover:shadow cursor-pointer"
              onClick={() => handleclick(cat._id)}
            >
              <img
                src={cat.image}
                alt={cat.name}
                className="w-full h-40 object-contain rounded-lg"
              />


            </div>
          ))}
        </div>
      </div>
      {
  categorydata.map((cat) => (
    <div key={cat._id}>
      <div className="flex justify-between px-5 gap-5">
        <h2 className="font-semibold text-3xl p-2">{cat.name}</h2>
        <span className="text-blue-600 cursor-pointer hover:underline text-md" onClick={()=>handleclick(cat._id)}>See All</span>
      </div>
      <Productinfo id={cat._id}/>
    </div>
  ))
}



    </section>
  );
};

export default Home;
