import React, { useEffect } from 'react'
import { Outlet } from 'react-router-dom'
import  { Toaster } from 'react-hot-toast';
import Header from './components/header.jsx'
import Footer from './components/footer.jsx'
import fetchUserDetails from './utils/fetchuserdetails.js'
import { setUserDetail } from './store/userslice.js';
import { useDispatch, useSelector } from 'react-redux';
import { setAllCategory,setAllProduct } from './store/productslice.js';
import Axios from './utils/Axios.jsx';
import summaryapi from './common/summaryapi.js';
const App = () => {
  const dispatch = useDispatch();
  const fetchProduct = async () => {
    try {
        const res = await Axios({ ...summaryapi.getproduct });

        if (res.data.success) {
          dispatch(setAllProduct(res.data.data));
        }

        
    } catch (error) {
        console.log(error);
    } 
};
   const fetchcategory = async () => {
    try {
      const response = await Axios({
        ...summaryapi.getcategory,
      });
      if (response?.data?.success) {
       dispatch(setAllCategory( response.data.data));
      }
    } catch (error) {
      console.error(error);
    } 
    
  };
  const fetchuser = async () => {
    const userData = await fetchUserDetails()
    dispatch(setUserDetail(userData?.data))
  }
  useEffect(() => {
    fetchuser()
    fetchcategory()
    fetchProduct()
  }, [])
  return (
    <div className='flex flex-col justify-between min-h-screen' >
      <Header></Header>
      <main className=' overflow-x-hidden flex-grow'>
        <Outlet />
      </main>
      <Footer></Footer>
      <Toaster></Toaster>
    </div>

  )
}

export default App
