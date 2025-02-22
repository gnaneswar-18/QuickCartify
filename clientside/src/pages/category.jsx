import React, { useEffect, useState } from 'react';
import Uploadcategory from '../components/uploadcategory.jsx';
import Axios from '../utils/Axios';
import summaryapi from '../common/summaryapi';
import Loading from '../components/loading.jsx';
import toast from 'react-hot-toast';
import Editcategory from '../components/editcategory.jsx';
import AxiosToastError from '../utils/AxiosToastError.jsx';
import { useSelector } from 'react-redux';
const Category = () => {
  const [openuploadcategory, setopnenuploadcategory] = useState(false);
  const [categorydata, setcategorydata] = useState([]);

  const [loading, setloading] = useState(false);
  const [openedit, setopenedit] = useState(false);
  const [editcategorydata, seteditcategorydata] = useState({
    id: "",
    name: "",
    image: "",

  });

  const allcategory = useSelector(state => state.product.allcategory)

  useEffect(() => {
    setcategorydata(allcategory);
  }, [allcategory]);
  const handledelete = async (categoryId) => {
    try {
      const response = await Axios({
        ...summaryapi.deletecategory,
        data: { id: categoryId }
      });
      if (response?.data?.success) {
        toast.success(response.data.message);
      }
    } catch (error) {
      AxiosToastError(error)
    }
  }

  return (

    <section className=" overflow-y-auto " style={{ maxHeight: "80vh" }}>
      <div className=" p-4 bg-white shadow flex justify-between items-center sticky top-0  ">
        <h2 className="text-lg font-semibold">CATEGORY</h2>
        <button
          className="text-sm border border-primary-dark rounded px-3 py-1 hover:bg-primary-light"
          onClick={() => {
            setopnenuploadcategory(true);
          }}
        >
          Add Category
        </button>
      </div>
      {loading ? (
        <Loading />
      ) : categorydata.length === 0 ? (
        <div className="text-center mt-6">No data available</div>
      ) : (
        <div className=" p-5">
          <div className="flex flex-wrap gap-6 justify-start items-center scrollbar">
            {categorydata.map((category) => (
              <div
                key={category._id}
                className=" w-52 h-66 rounded-lg shadow-md hover:shadow-lg border border-gray-200 p-3 flex flex-col items-center"
              >

                <img
                  src={category.image}
                  alt={category.name}
                  className="w-full h-[70%] object-scale-down rounded-md mb-3 "
                />
                <div className="flex gap-2 mt-2 justify-between">
                  <div className="font-medium px-3 py-1 bg-blue-200 text-blue-700 rounded cursor-pointer" onClick={() => {
                    seteditcategorydata(
                      {
                        id: category._id,
                        name: category.name,
                        image: category.image
                      }
                    )
                    setopenedit(true);
                  }}>
                    EDIT
                  </div>
                  <div className="text-sm px-3 py-1 bg-red-200 text-red-700 rounded " onClick={() => handledelete(category._id)}>
                    DELETE
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}


      {openuploadcategory && (
        <div className='fixed inset-0 bg-neutral-800 flex items-center justify-center p-4'> 
          <Uploadcategory
            close={() => setopnenuploadcategory(false)}
          />
        </div>
      )}
      {
        openedit && (
          <Editcategory close={() => setopenedit(false)} editcategorydata={editcategorydata}

          ></Editcategory>
        )
      }
    </section>
  );
};

export default Category;


