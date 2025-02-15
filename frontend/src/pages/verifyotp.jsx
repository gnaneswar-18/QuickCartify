import React, { useEffect, useState } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import toast from 'react-hot-toast'
import summaryapi from '../common/summaryapi'
import Axios from '../utils/Axios.jsx'
import AxiosToastError from '../utils/AxiosToastError.jsx'
const VerifyOtp = () => {
  const navigate = useNavigate()
  const location = useLocation();
  const [data, setdata] = useState({
    email: location?.state?.email,
    otp: ""
  })
  const handlechange = (e) => {
    setdata({ ...data, [e.target.name]: e.target.value })
  }
  useEffect(() => {
    if (!location?.state?.email) {
      navigate("/forgotpassword")
    }
  })
  const handlesubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await Axios({
        ...summaryapi.verifyotp,
        data: data
      })
      if (response.data.error) {
        AxiosToastError(response.data.error);
      }
      if (response.data.success) {
        navigate("/resetpassword", {
          state: {
            data: response.data,
            email: data.email

          }
        })
        toast.success(response.data.message)
        setdata({
          email: "",
          otp: ""
        })
      }

    } catch (err) {
      AxiosToastError(err)
    }

  }
  return (
    <section className=' w-full container mx-auto px-2'>

      <div className='bg-white my-10 w-full max-w-lg mx-auto rounded p-4'>
        <p className='text-center font-bold text-2xl mb-4'>VERIFY OTP</p>
        <form onSubmit={handlesubmit}>
          <div className='mb-4'>
            <label className='block  text-sm font-bold mb-2' HtmlFor='otp'>
              Enter OTP
            </label>
            <input className='border-2 border-gray-400 rounded bg-blue-50 w-full py-2 px-3 ' type='number' name='otp' id='otp' required value={data.otp} onChange={handlechange} />
          </div>

          <button className='w-full bg-green-600 p-3 mx-auto my-4 rounded font-medium'>VERIFY OTP</button>

        </form>

      </div>

    </section>
  )
}

export default VerifyOtp
