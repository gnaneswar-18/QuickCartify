import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import Divider from '../components/divider.jsx'
import Axios from '../utils/Axios.jsx'
import summaryapi from '../common/summaryapi.js'
import { logout } from '../store/userslice.js'
import toast from 'react-hot-toast'
import AxiosToastError from '../utils/AxiosToastError.jsx'
import { FiExternalLink } from "react-icons/fi";
import isAdmin from '../utils/isAdmin.js';
const UserMenu = ({ close }) => {
  const navigate=useNavigate()
  const dispatch = useDispatch()
  const user = useSelector(state => state.user)
  const handlelogout = async () => {
    try {
      const response = await Axios({
        ...summaryapi.logout
      })
      if (response.data.success) {
        navigate('/')
        dispatch(logout())
        console.log("user agter logout", user)
        localStorage.clear()
        toast.success(response.data.message)
      }
    } catch (error) {
      console.log(error)
      AxiosToastError(error)
    }
  }
  return (
    <div className='px-3 text-start z-30 relative '>
      <div className='font-semibold' >MY ACCOUNT</div>
      <div className='  flex items-center gap-2'>
        <span className='max-w-52 text-ellipsis line-clamp-1'>{user.name}<span>({user?.role==="Admin"?"Admin":""})</span></span>
        <Link to="/dashboard/profile" className='hover:bg-blue-50' onClick={close}><FiExternalLink size={15} /></Link>
      </div>
      <Divider />
      <div className=' text-sm grid gap-2 '>
      {
        isAdmin(user?.role) &&(
          <>
          <Link to={'/dashboard/category'} className='p-1 hover:bg-blue-50'>Category</Link>
          <Link to={'/dashboard/upload-product'} className='p-1 hover:bg-blue-50'>Upload Product</Link>
          <Link to={'/dashboard/product'} className='p-1 hover:bg-blue-50'>Products</Link>
          </>
        )
      }
      
        <Link to={'/dashboard/myorders'} className='p-1 hover:bg-blue-50'>My Orders</Link>
        <Link to={"/dashboard/address"} className='p-1 hover:bg-blue-50'>Save Address</Link>
        <button className='text-center bg-red-500 rounded p-1 hover:bg-red-600 ' onClick={handlelogout}>LOG OUT</button>
      </div>
    </div>
  )
}

export default UserMenu
