import React, { useState } from "react";
import { IoMdClose } from "react-icons/io";
import uploadimage from "../utils/uploadimage.jsx";
import Axios from "../utils/Axios.jsx";
import toast from "react-hot-toast";
import AxiosToastError from "../utils/AxiosToastError.jsx";
import summaryapi from "../common/summaryapi.js";

const UploadCategory = ({ close, fetchcategory }) => {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState({
    name: "",
    image: "",
  });

  const handleChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!data.image || !data.name) return;
    try {
      const response = await Axios({ ...summaryapi.addcategory, data });
      if (response.data.success) {
        toast.success("Successfully added category");
        close();
        // fetchcategory();
      }
    } catch (error) {
      AxiosToastError(error);
    }
  };

  const handleUploadCategory = async (e) => {
    e.preventDefault();
    const file = e.target.files[0];
    if (!file) return;
    try {
      setLoading(true);
      const upload = await uploadimage(file);
      setData({ ...data, image: upload?.data || "" });
    } catch (error) {
      AxiosToastError(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    
      <section className="bg-white max-w-lg w-full p-6 rounded-lg shadow-lg">
        <div className="flex justify-between items-center border-b pb-3 mb-4">
          <h2 className="text-xl font-bold">Add Category</h2>
          <button onClick={close} className="text-gray-500 hover:text-gray-700">
            <IoMdClose size={25} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-gray-700">Category Name</label>
            <input
              type="text"
              name="name"
              id="name"
              placeholder="Enter category name"
              value={data.name}
              onChange={handleChange}
              className="w-full mt-1 p-2 border rounded-lg focus:ring-2 focus:ring-blue-300 focus:outline-none"
            />
          </div>

          <div>
            <p className="block text-sm font-medium text-gray-700">Image</p>
            <div className="flex items-center gap-3 mt-2">
              {data.image ? (
                <img src={data.image} alt="Uploaded" className="w-32 h-32 object-contain border rounded-md" />
              ) : (
                <p className="text-gray-500">No image uploaded</p>
              )}
              <label htmlFor="image" className="cursor-pointer bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600">
                Upload Image
              </label>
              <input type="file" id="image" className="hidden" onChange={handleUploadCategory} />
            </div>
          </div>

          <div className="flex justify-end">
            <button
              type="submit"
              className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 disabled:bg-gray-400"
              disabled={loading}
            >
              {loading ? "Uploading..." : "Add Category"}
            </button>
          </div>
        </form>
      </section>
    
  );
};

export default UploadCategory;