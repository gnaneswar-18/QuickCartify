import React, { useEffect } from 'react'
import { Outlet } from 'react-router-dom'
import { Toaster } from 'react-hot-toast';
import Header from './components/header.jsx'
import Footer from './components/footer.jsx'
import fetchUserDetails from './utils/fetchuserdetails.js'
import { setUserDetail } from './store/userslice.js';
import { useDispatch, useSelector } from 'react-redux';
import { setAllCategory, setAllProduct } from './store/productslice.js';
import Axios from './utils/Axios.jsx';
import summaryapi from './common/summaryapi.js';
import { setcartitems } from './store/cartslice.js';
import { setAddressList } from './store/addressslice.js';

const App = () => {
  const user=useSelector(state=>state.user)
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

  const fetchCategory = async () => {
    try {
      const response = await Axios({ ...summaryapi.getcategory });
      if (response?.data?.success) {
        dispatch(setAllCategory(response.data.data));
      }
    } catch (error) {
      console.error(error);
    }
  };

  const fetchCartDetails = async () => {
    try {
      const response = await Axios({ ...summaryapi.getcartitems });
      if (response?.data?.success) {
        dispatch(setcartitems(response.data.data));
      }
    } catch (error) {
      console.log(error);
    }
  };

  const fetchUser = async () => {
    const userData = await fetchUserDetails();
    dispatch(setUserDetail(userData?.data));
  };
  const fetchaddreslist = async () => {
    try {
      const response = await Axios({...summaryapi.getaddress });
      if (response?.data?.success) {
        dispatch(setAddressList(response.data.data));
      }
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    fetchUser();
    fetchCategory();
    fetchProduct();
    fetchCartDetails();
    fetchaddreslist()
  }, [user]);

  return (
    <div className="flex flex-col min-h-screen relative">
      <Header />
      <main className="overflow-x-hidden min-h-[90vh] pb-32">
        <Outlet />
      </main>
      <Footer />
      <Toaster />

    </div>
  );
};

export default App;
