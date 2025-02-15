import React, { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import toast from 'react-hot-toast'
import summaryapi from '../common/summaryapi'
import Axios from '../utils/Axios.jsx'
import AxiosToastError from '../utils/AxiosToastError.jsx'
import fecthUserDetails from '../utils/fetchuserdetails.js'
import { useDispatch } from 'react-redux'
import { setUserDetail } from '../store/userslice.js'
const login = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const [data, setdata] = useState({
    email: "",
    password: ""
  })
  const handlechange = (e) => {
    setdata({ ...data, [e.target.name]: e.target.value })
  }

  const handlesubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await Axios({
        ...summaryapi.login,
        data: data
      })
      if (response.data.error) {
        AxiosToastError(response.data.error);
      }
      if (response.data.success) {
        localStorage.setItem("accessToken", response.data.data.accessToken)
        localStorage.setItem("refreshToken", response.data.data.refreshToken)
        const userdetails = await fecthUserDetails()
        dispatch(setUserDetail(userdetails.data))
        toast.success(response.data.message)
        setdata({
          email: "",
          password: "",
        })
      }
      navigate("/")
    } catch (err) {
      AxiosToastError(err)
    }

  }
  return (
    <section className=' w-full container mx-auto px-2'>
      <div className='bg-white my-10 w-full max-w-lg mx-auto rounded p-4'>
        <p className='text-center font-bold text-3xl'>LOGIN</p>
        <p className='pb-3'> Welcome To Ecommerce Store</p>
        <form onSubmit={handlesubmit}>

          <div className='mb-4'>
            <label className='block  text-sm font-bold mb-2' htmlFor='email'>
              Email
            </label>
            <input className='border-2 border-gray-400 rounded bg-blue-50 w-full py-2 px-3 ' type='email' name='email' id='email' required value={data.email} onChange={handlechange} />
          </div>
          <div>
            <label className='block  text-sm font-bold mb-2' htmlFor='password'>
              Password
            </label>
            <input className='border-2 border-gray-400 bg-blue-50 rounded w-full py-2 px-3 ' type='password' name='password' id='password' required value={data.password} onChange={handlechange} />
          </div>
          <Link to='/forgotpassword' className='font-extrabold text-base text-blue-800 hover:text-blue-900'>Forget Password ?</Link>

          <button className='w-full bg-green-600 p-3 mx-auto my-4 rounded'>LOGIN</button>

        </form>
        <p className='text-center'>Don't Have Account? <Link className='font-bold text-base text-blue-800 hover:text-blue-900' to='/register'>Sign Up</Link></p>
      </div>

    </section>
  )
}

export default login
