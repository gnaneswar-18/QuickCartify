import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import Axios from '../utils/Axios.jsx';
import AxiosToastError from '../utils/AxiosToastError';
import summaryapi from '../common/summaryapi.js';

const Myorders = () => {

  const user = useSelector((state) => state.user);
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchOrders = async () => {
    try {
      const response = await Axios({ ...summaryapi.getorders }, {
        data: { userId: user.id }
      });
      if (response?.data?.success) {
        setOrders(response.data.data);
      }
      console.log(response.data);
    } catch (error) {
      AxiosToastError(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (!user) {
      window.location.href = '/login';
    } else {
      fetchOrders();
    }
  }, [user.isLoggedIn]);

  return (

    <section className=" overflow-y-auto " style={{ maxHeight: "80vh" }}>

      <h2 className="text-2xl font-semibold mb-4">My Orders</h2>

      {loading ? (
        <p>Loading...</p>
      ) : !Array.isArray(orders) || orders.length === 0 ? (
        <p>No orders found.</p>
      ) : (
        <div className="grid gap-4">
          {orders.map((order) => (
            <div key={order._id} className="border rounded-xl p-4 shadow-sm bg-white">
              <div className="flex items-center gap-4">
                <img
                  src={order.product_details?.image?.[0].url}
                  alt={order.product_details?.name}
                  className="w-20 h-20 object-cover rounded-lg border"
                />
                <div className="flex flex-col">
                  <h3 className="text-lg font-bold">{order.product_details?.name}</h3>
                  <p className="text-sm text-gray-600">Order ID: {order.orderId}</p>
                  <p className="text-sm text-gray-600">Payment Status: {order.payment_Status || 'Pending'}</p>
                </div>
              </div>

              <div className="mt-3 flex justify-between items-center">
                <div>
                  <p className="text-base font-semibold">Total: ₹{order.totalAmt}</p>
                  <p className="text-sm text-gray-500">Ordered on: {new Date(order.createdAt).toLocaleDateString()}</p>
                </div>
                <button className="bg-blue-500 text-white px-3 py-1 rounded-md hover:bg-blue-600 transition">
                  View Details
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </section>


  );
};


export default Myorders;
