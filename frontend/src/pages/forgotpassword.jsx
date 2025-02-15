import React, { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import toast from 'react-hot-toast'
import summaryapi from '../common/summaryapi'
import Axios from '../utils/Axios.jsx'
import AxiosToastError from '../utils/AxiosToastError.jsx'
const ForgotPassword = () => {
  const navigate = useNavigate()
  const [data, setdata] = useState({
    email: "",
  })
  const handlechange = (e) => {
    setdata({ ...data, [e.target.name]: e.target.value })
  }
  const handlesubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await Axios({
        ...summaryapi.forgotpassword,
        data: data
      })
      if (response.data.error) {
        AxiosToastError(response.data.error);
      }
      if (response.data.success) {
        toast.success(response.data.message)
        navigate("/verifyotp", { state: { email: data.email } })
        setdata({
          email: "",
        })
      }

    } catch (err) {
      AxiosToastError(err)
    }

  }
  return (
    <section className=' w-full container mx-auto px-2'>
      <div className='bg-white my-10 w-full max-w-lg mx-auto rounded p-4'>
        <p className='font-bold text-2xl mb-4'>FORGOT PASSWORD</p>
        <form onSubmit={handlesubmit}>

          <div className='mb-4'>
            <label className='block  text-sm font-bold mb-2' HtmlFor='email'>
              Email
            </label>
            <input className='border-2 border-gray-400 rounded bg-blue-50 w-full py-2 px-3 ' type='email' name='email' id='email' required value={data.email} onChange={handlechange} />
          </div>

          <button className='w-full bg-green-600 p-3 mx-auto my-4 rounded'>SEND OTP</button>

        </form>
        <p className='text-center'>Already Have An Account? <Link className='font-bold text-base text-blue-800 hover:text-blue-900' to='/login'>Login</Link></p>

      </div>

    </section>
  )
}

export default ForgotPassword
