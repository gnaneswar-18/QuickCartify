import React, { useState } from 'react';
import { FaCloudUploadAlt } from "react-icons/fa";
import uploadimage from "../utils/uploadimage.jsx";
import Loading from '../components/loading.jsx';
import { IoMdClose } from "react-icons/io";
import { MdDelete } from "react-icons/md";
import { useSelector } from 'react-redux';
import Axios from '../utils/Axios.jsx';
import AxiosToastError from '../utils/AxiosToastError.jsx'
import toast from 'react-hot-toast';
import summaryapi from '../common/summaryapi.js';
const Uploadproduct = () => {
  const [loading, setloading] = useState(false);
  const [selectcategory, setselectcategory] = useState("");
  const [data, setdata] = useState({
    name: "",
    image: [],
    category: [],
    unit: [],
    stock: "",
    price: "",
    discount: "",
    description: "",
  });

  const allcategory = useSelector(state => state.product.allcategory);

  const handleuploadimage = async (e) => {
    setloading(true);
    const file = e.target.files[0];
    if (!file) return;

    const response = await uploadimage(file);
    const url = response.data;

    setdata(prev => ({
      ...prev,
      image: [...prev.image, { url }]
    }));

    setloading(false);
  };

  const handledeleteimage = (index) => {
    setdata(prev => ({
      ...prev,
      image: prev.image.filter((_, i) => i !== index)
    }));
  };

  const handleCategoryChange = (e) => {
    const selectedId = e.target.value;
    const category = allcategory.find(c => c._id === selectedId);

    if (category) {
      setdata(prev => ({
        ...prev,
        category: [...prev.category, category]
      }));
      setselectcategory("");
    }
  };
  const handlesubmit = async (e) => {
    e.preventDefault();
    try {

      const res = await Axios({
        ...summaryapi.addproduct,
        data: data
      })
      if(res.data.success){
        toast.success("Product Added successfully")
        setdata({
          name: "",
          image: [],
          category: [],
          unit: [],
          stock: "",
          price: "",
          discount: "",
          description: "",
        })
      }

    } catch (error) {
      console.log(error)
       AxiosToastError(error);
    }
  }

  return (
    <section className=" overflow-y-auto " style={{ maxHeight: "80vh" }}>
      <div className="z-100 p-4 bg-white shadow flex justify-between items-center">
        <h2 className="text-lg font-semibold">Upload Product</h2>
      </div>
      <div className='p-4'>
        <form className='grid gap-4' onSubmit={handlesubmit}>
          <div className='grid gap-1'>
            <label htmlFor='name'>Product Name:</label>
            <input
              type="text"
              value={data.name}
              placeholder='Enter product name'
              name='name'
              id='name'
              onChange={(e) => setdata({ ...data, name: e.target.value })}
              required
              className='bg-blue-50 p-2 outline-none focus-within:border-primary-dark rounded-lg border'
            />
          </div>

          <div className='grid gap-1'>
            <label htmlFor='description'>Description</label>
            <textarea
              value={data.description}
              placeholder='Enter product description'
              name='description'
              id='description'
              rows={2}
              onChange={(e) => setdata({ ...data, description: e.target.value })}
              required
              className='bg-blue-50 p-2 outline-none border focus-within:border-primary-dark rounded-lg resize-none'
            />
          </div>
          <div>
            <p>Image</p>
            <label htmlFor='productimage' className='bg-slate-100 h-24 rounded flex justify-center items-center'>
              <div className='flex flex-col justify-center items-center'>
                {loading ? <Loading /> : (
                  <>
                    <FaCloudUploadAlt size={40} />
                    <p>Upload images</p>
                  </>
                )}
              </div>
              <input
                type="file"
                id='productimage'
                className='hidden'
                onChange={handleuploadimage}
                accept='image/*'
              />
            </label>

            <div className='flex gap-2 items-center mt-2'>
              {data.image.map((image, index) => (
                <div key={index} className='h-20 w-20 min-w-20 relative group'>
                  <img src={image.url} alt='' className='object-scale-down h-full w-full' />
                  <div className='absolute top-0 right-0 hidden group-hover:block cursor-pointer' onClick={() => handledeleteimage(index)}>
                    <IoMdClose color='red' />
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div>
            <label htmlFor="category">Category</label>
            <div>
              <select
                value={selectcategory}
                id="category"
                className='bg-blue-50 w-full p-2 rounded outline-none'
                onChange={handleCategoryChange}
              >
                <option value="">Select Category</option>
                {allcategory.map((category) => (
                  <option key={category._id} value={category._id}>{category.name}</option>
                ))}
              </select>

              <div className="flex flex-wrap mt-2">
                {data.category.map((category, index) => (
                  <div key={index} className="border border-slate-200 p-2 justify-between flex  items-center">
                    <p>{category.name}</p>
                    <MdDelete
                      className="cursor-pointer text-red-500"
                      onClick={() => setdata(prev => ({
                        ...prev,
                        category: prev.category.filter((_, i) => i !== index)
                      }))}
                    />
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className='grid gap-1'>
            <label htmlFor='unit'>Unit:</label>
            <input
              type="text"
              value={data.unit}
              placeholder='Enter product unit'
              name='unit'
              id='unti'
              onChange={(e) => setdata({ ...data, unit: e.target.value })}
              required
              className='bg-blue-50 p-2 outline-none focus-within:border-primary-dark rounded-lg border'
            />
          </div>
          <div className='grid gap-1'>
            <label htmlFor='stock'>No of Stock:</label>
            <input
              type="number"
              value={data.stock}
              placeholder='Enter product stock'
              name='stock'
              id='stock'
              onChange={(e) => setdata({ ...data, stock: e.target.value })}
              required
              className='bg-blue-50 p-2 outline-none focus-within:border-primary-dark rounded-lg border'
            />
          </div>
          <div className='grid gap-1'>
            <label htmlFor='stock'>Product price:</label>
            <input
              type="number"
              value={data.price}
              placeholder='Enter product price'
              name='price'
              id='price'
              onChange={(e) => setdata({ ...data, price: e.target.value })}
              required
              className='bg-blue-50 p-2 outline-none focus-within:border-primary-dark rounded-lg border'
            />
          </div>
          <div className='grid gap-1'>
            <label htmlFor='discount'>Product discount:</label>
            <input
              type="number"
              value={data.discount}
              placeholder='Enter product discount'
              name='discount'
              id='discount'
              onChange={(e) => setdata({ ...data, discount: e.target.value })}
              required
              className='bg-blue-50 p-2 outline-none focus-within:border-primary-dark rounded-lg border'
            />
          </div>
          <div>
            <button type='submit' className='text-white bg-blue-500 p-2 rounded-lg w-full'>
              Upload Product
            </button>
          </div>
        </form>
      </div>
    </section>
  );
};

export default Uploadproduct;
