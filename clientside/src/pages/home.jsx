import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Productinfo from "./productinfo.jsx";
import { FaUtensils, FaRegCalendarAlt, FaTruck } from "react-icons/fa";



const Home = () => {
  const categorydata = useSelector((state) => state.product.allcategory);

  const navigate = useNavigate()
  const handleclick = (id) => {
    navigate(`/productlist/${id}`)

  }
  return (
    <section>
      <div className="flex flex-col md:flex-row items-center justify-between px-6 md:px-20 py-12 relative overflow-hidden">
        <div className="flex-1 max-w-xl text-center md:text-left z-10">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-800 leading-tight mb-4">
            Fresh Food & Groceries <br />
            Delivered in Minutes
          </h1>
          <p className="text-gray-500 mb-6">
            Scrambled it to make a type specimen book. It has survived not only five centuries,
            but also the leap into.
          </p>
          <button className="bg-green-500 text-white px-6 py-3 rounded-full shadow hover:bg-green-600 transition">
            Order Now
          </button>

          <div className="mt-10 grid grid-cols-3 gap-4 text-sm font-medium text-gray-700">
            <div className="flex flex-col items-center bg-green-50 rounded-xl p-4 shadow-sm hover:shadow-md transition">
              <FaUtensils size={24} className="text-green-500 mb-2" />
              <p>Catering</p>
            </div>
            <div className="flex flex-col items-center bg-green-100 rounded-xl p-4 shadow-sm hover:shadow-md transition">
              <FaRegCalendarAlt size={24} className="text-green-600 mb-2" />
              <p>Booking</p>
            </div>
            <div className="flex flex-col items-center bg-green-200 rounded-xl p-4 shadow-sm hover:shadow-md transition">
              <FaTruck size={24} className="text-green-500 mb-2" />
              <p>Delivery</p>
            </div>
          </div>
        </div>

        <div className="flex-1 flex justify-center mt-12 md:mt-0 z-10">
          <img
            src={import.meta.env.VITE_HOME_IMG}
            alt="Food Bowl"
            className="max-w-sm md:max-w-md rounded-full object-contain"
          />
        </div>

        <div className="absolute right-0 top-10 w-72 h-72 bg-green-300 rounded-full blur-3xl opacity-30 z-0"></div>
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
              <span className="text-blue-600 cursor-pointer hover:underline text-md" onClick={() => handleclick(cat._id)}>See All</span>
            </div>
            <Productinfo id={cat._id} />
          </div>
        ))
      }
    </section>
  );
};

export default Home;