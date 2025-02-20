import React, { useEffect, useState } from 'react'
import {useNavigate,Link, useLocation} from 'react-router-dom'
import toast from 'react-hot-toast'
import summaryapi from '../common/summaryapi'
import Axios from '../utils/Axios.jsx'
import AxiosToastError from '../utils/AxiosToastError.jsx'
const ResetPassword = () => {
  const location=useLocation()
  const navigate=useNavigate()
  const [data, setdata] = useState({
    email:location?.state?.email,
    newpassword:"",
    confirmpassword: ""
  })
  useEffect(()=>{
     if(!( location?.state?.data?.success)){
      navigate('/')
     }
  },[])
  const handlechange = (e) => {
    setdata({...data, [e.target.name]: e.target.value })
  }
  const handlesubmit = async(e) => {
   
    e.preventDefault();
    console.log(data)
    if(data.newpassword!=data.confirmpassword) {
      toast.error("Passwords do not match")
      return;
    }
    try {
      const response=await Axios({
        ...summaryapi.resetpassword,
        data:data

      })
      if(response.data.error) {
        AxiosToastError(response.data.error);
      }
        if(response.data.success){
        toast.success(response.data.message)
          setdata({
            newpassword: "",
            confirmpassword: "",
          })
        }
      navigate("/login")
    } catch (err) {
      AxiosToastError(err)
    }
    
  }
  return (
    <section className=' w-full container mx-auto px-2'>
      <div className='bg-white my-10 w-full max-w-lg mx-auto rounded p-4'>
      <p className='text-center font-bold text-3xl'>NEW PASSWORD</p>
        <form onSubmit={handlesubmit}>
            <div className='mb-4'>
              <label className='block text-sm font-bold mb-2' HtmlFor='newpassword'>
                New Passwprd
              </label>
              <input className='border-2 border-gray-400 rounded bg-blue-50 w-full py-2 px-3 text-black' type='password' name='newpassword' id='newpassword'  value={data.newpassword}onChange={handlechange} />
            </div>
            <div>
              <label className='block  text-sm font-bold mb-2' HtmlFor='confirmpassword'>
                Conform Password
              </label>
              <input className='border-2 border-gray-400 bg-blue-50 rounded w-full py-2 px-3 ' type='password' name='confirmpassword' id='confirmpassword'  value={data.confirmpassword} onChange={handlechange}/>
            </div>
             <button className='w-full bg-green-600 p-3 mx-auto my-4 rounded'>UPDATE PASSWORD</button>

        </form>
           {/* <p className='text-center'>Don't Have Account? <Link className='font-bold text-base text-blue-800 hover:text-blue-900' to='/register'>Sign Up</Link></p> */}
      </div>

    </section>
  )
}

export default ResetPassword
