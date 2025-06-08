import React, { useState } from "react";
import { useNavigate } from "react-router-dom"; // ✅ Correct import

const CancelOrder = () => {
  const navigate = useNavigate(); // ✅ Call useNavigate()

  return (
    <div className="flex flex-col items-center  min-h-screen bg-gray-100 p-6">
      <div className="bg-white shadow-lg rounded-lg p-6 max-w-lg w-full text-center">
        <h2 className="text-2xl font-semibold text-gray-800">Cancel Order</h2>
        <p className="text-gray-600 mt-2">
          Are you sure you want to cancel your order?
        </p>

        <div className="flex justify-center mt-6 gap-4">
          <button
            onClick={() => {
              alert("Your order has been canceled!");
              navigate("/"); 
            }}
            className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition"
          >
            Cancel Order
          </button>
          <button
            onClick={() => navigate("/")} 
            className="bg-gray-300 px-4 py-2 rounded-lg hover:bg-gray-400 transition"
          >
            Go Back
          </button>
        </div>
      </div>
    </div>
  );
};

export default CancelOrder;
