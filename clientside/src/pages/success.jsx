import React from "react";
import { useNavigate } from "react-router-dom";

const SuccessPage = () => {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col items-center  min-h-screen  p-6">
      <div className="bg-white shadow-lg rounded-lg p-6 max-w-lg w-full text-center">
        
        <h2 className="text-2xl font-semibold text-gray-800 mt-4">Order Successful!</h2>
        <p className="text-gray-600 mt-2">Thank you for your purchase. Your order has been placed successfully.</p>

        <div className="mt-6">
          <button
            onClick={() => navigate("/")}
            className="bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600 transition"
          >
            Back to Home
          </button>
        </div>
      </div>
    </div>
  );
};

export default SuccessPage;
