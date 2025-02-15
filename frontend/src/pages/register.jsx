import React, { useState } from 'react'
import {useNavigate,Link} from 'react-router-dom'
import toast from 'react-hot-toast'
import summaryapi from '../common/summaryapi'
import Axios from '../utils/Axios.jsx'
import AxiosToastError from '../utils/AxiosToastError.jsx'
const register = () => {
  const navigate=useNavigate()
  const [data, setdata] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: ""
  })
  const handlechange = (e) => {
    setdata({...data, [e.target.name]: e.target.value })
  }
  const handlesubmit = async(e) => {
    console.log(summaryapi.register)
    e.preventDefault();
    if(data.password !== data.confirmPassword){
     toast.error("password and confirm password must be the same")
     return;
    }
    try {
      const response=await Axios({
        ...summaryapi.register,
        data:data
      })
      if(response.data.error) {
        AxiosToastError(response.data.error);
      }
        if(response.data.success){
        toast.success(response.data.message)
          setdata({
            name: "",
            email: "",
            password: "",
            confirmPassword: ""
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
      <p className='text-center font-bold text-3xl'>REGISTER</p>
      <p className='pb-3'> Welcome To Ecommerce Store</p>
        <form onSubmit={handlesubmit}>

            <div className='mb-4'>
              <label className='block  text-sm font-bold mb-2' HtmlFor='name'>
                Username
              </label>
              <input className='border-2 border-gray-400 bg-blue-50 rounded w-full py-2 px-3 ' type='text' name='name' id='name' required value={data.name}onChange={handlechange} />
            </div>
            <div className='mb-4'>
              <label className='block  text-sm font-bold mb-2' HtmlFor='email'>
                Email
              </label>
              <input className='border-2 border-gray-400 rounded bg-blue-50 w-full py-2 px-3 ' type='email' name='email' id='email' required value={data.email}onChange={handlechange} />
            </div>
            <div>
              <label className='block  text-sm font-bold mb-2' HtmlFor='password'>
                Password
              </label>
              <input className='border-2 border-gray-400 bg-blue-50 rounded w-full py-2 px-3 ' type='password' name='password' id='password' required value={data.password} onChange={handlechange}/>
            </div>
            <div>
              <label className='block  text-sm font-bold mb-2' HtmlFor='confirmPassword'>
                Confirm Password
              </label>
              <input className='border-2 border-gray-400 bg-blue-50 rounded w-full py-2 px-3 ' type='password' name='confirmPassword' id='confirmPassword' required value={data.confirmPassword} onChange={handlechange}/>
            </div>
             <button className='w-full bg-green-600 p-3 mx-auto my-4 rounded'>REGISTER</button>

        </form>
           <p className='text-center'>Already Have an Account ? <Link className='font-bold text-base text-blue-800 hover:text-blue-900' to='/login'>Login</Link></p>
      </div>

    </section>
  )
}

export default register
