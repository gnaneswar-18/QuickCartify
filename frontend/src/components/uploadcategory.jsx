import React, { useState } from 'react'
import { IoMdClose } from "react-icons/io";
import uploadimage from '../utils/uploadimage.jsx';
import Axios from '../utils/Axios.jsx';
import toast from 'react-hot-toast';
import AxiosToastError from '../utils/AxiosToastError.jsx';
import summaryapi from '../common/summaryapi.js';
const Uploadcategory = ({ close,fetchcategory }) => {
    const [loading, setloading] = useState(false);
    const [data, setdata] = useState({
        name: '',
        image: ''
    })
    const handlechange = (e) => {
        setdata({ ...data, [e.target.name]: e.target.value })
    }
    const handlesubmit =async (e) => {
        e.preventDefault();
        if(!data.image ||!data.name) return
       try {
        const response=await Axios({
            ...summaryapi.addcategory,
            data
        }) 
        if(response.data.success){
            toast.success("Successfully added category");
            close();
            fetchcategory()
        }
       } catch (error) {
        AxiosToastError(error)
       }
    }
    const handleuploadcategory = async (e) => {
        const file = e.target.files[0];
        if (!file) return
        try {
            setloading(true);
            const upload = await uploadimage(file);
            setdata({ ...data, image: upload?.data || '' });
            setloading(false);
        } catch (error) {
            AxiosToastError(error)
        }
       

    }
    return (
        <section className='fixed top-0 bottom-0 right-0 left-0 bg-neutral-900 bg-opacity-60 flex items-center justify-center '>
            <div className='bg-white max-w-4xl w-full p-4 rounded '>
                <div className='flex font-extrabold justify-between items-center'>
                    <h2>Category</h2>
                    <button onClick={close}>
                        <IoMdClose size={25} onClick={close} />
                    </button>

                </div>
                <form className='m-3' onSubmit={handlesubmit}>
                    <div className='grid gap-1'>
                        <label htmlFor="name" className='font-medium'>Name :</label>
                        <input className='rounded bg-blue-50 p-2 border outline-none border-blue-100 focus-within:border-blue-200' type="text" name="name" id="name" placeholder='enter category name' value={data.name} onChange={handlechange} />
                    </div>
                    <div>
                        <p className='font-medium '>Image : </p>
                        <div className=' flex items-center gap-2'>
                            {data.image ? (<img src={data.image} alt='no-image' className='w-40 h-40 object-contain border font-thin' />
                            ) : (
                                <p className='text-sm bg-neutral-300'>No image</p>
                            )}
                            <div>
                                <label htmlFor="image"><div className='cursor-pointer text-center  bg-primary-light text-white p-3 rounded-md'>Upload Image</div>
                                </label>
                                <input type="file" name="image" id="image" className='hidden' onChange={handleuploadcategory} />

                            </div>

                        </div>

                    </div>
                    <div className='flex justify-end'>
                        <button className='m-2 text-lg border border-secondary-dark hover:bg-secondary-dark py-1 px-4 rounded-md'>{
                            loading?"wait...":"ADD"}</button>
                    </div>

                </form>

            </div>
        </section>
    )
}

export default Uploadcategory
