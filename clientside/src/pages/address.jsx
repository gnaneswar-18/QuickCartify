import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { FaTrash } from 'react-icons/fa';
import AxiosToastError from '../utils/AxiosToastError';
import Axios from '../utils/Axios';
import { setAddressList } from '../store/addressslice.js';
import summaryapi from '../common/summaryapi';

const Address = () => {
  const dispatch = useDispatch();
  const addresslists = useSelector(state => state.address.addresslist);
  const fetchaddreslist = async () => {
    try {
      const response = await Axios({...summaryapi.getaddress });
      if (response?.data?.success) {
        dispatch(setAddressList(response.data.data));
      }
    } catch (error) {
      console.log(error);
      AxiosToastError(error.message)
    }
  }
  
  const handleDelete =async (index) => {
    try {
      const response = await Axios({
           ...summaryapi.deleteaddress,
            data:{id: addresslists[index]._id}
      })
      if (response?.data?.success) {
        toast.success("deleted address successfully");
        fetchaddreslist()
      }
      
    } catch (error) {
      AxiosToastError(error)
    }
        
  };

  return (
    <section className="w-full  mx-auto bg-white p-6 rounded-lg shadow-lg">
      <h2 className="text-2xl font-semibold text-gray-800 mb-6 border-b pb-2">Saved Addresses</h2>

      {addresslists.length === 0 ? (
        <p className="text-gray-500 text-center">No addresses found.</p>
      ) : (
        <div className="grid grid-cols-1 gap-4 overflow-y-auto max-h-[70vh] scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-gray-100">
          {addresslists.map((address, index) => (
            <div 
              key={index} 
              className="border border-gray-300 p-5 rounded-lg shadow-sm flex justify-between items-start bg-gray-50 hover:shadow-md transition"
            >
              <div>
                <h3 className="text-lg font-semibold text-gray-900">{address.address_line}</h3>
                <p className="text-gray-600">{address.city}, {address.state} - {address.zip_code}</p>
                <p className="text-gray-600">{address.country}</p>
                <p className="text-gray-600 font-medium">📞 {address.mobile}</p>
              </div>
              
              <button 
                onClick={() => handleDelete(index)} 
                className="bg-red-500 text-white p-2 rounded-lg hover:bg-red-600 transition-all flex items-center gap-1"
              >
                <FaTrash size={16} />
              </button>
            </div>
          ))}
        </div>
      )}
    </section>
  );
};

export default Address;
