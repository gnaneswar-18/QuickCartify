import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import { FaRegUserCircle } from "react-icons/fa";
import Userprofileavataredit from '../components/userprofileavataredit';
const Profile = () => {
  const user = useSelector(state => state.user)
  const [openprofileavataredit, setopenprofileavataredit] = useState(false)
  const [userdata,setuserdata]=useState({
    name:user.name,
    email:user.email,
    mobile:user.mobile
  })
  const handlechange=(e) => {
    setuserdata({...userdata,[e.target.name]:e.target.value})
  }
  return (
    <div className='p-10'>
      <div className='m-2 w-20 h-20 rounded-full overflow-hidden border-2   '>
        {user?.avatar ? (
          <img src={user.avatar} alt="" className='w-full h-full object-cover' />
        ) : (
          <FaRegUserCircle size={65} />
        )}

      </div>
      <button className=' text-sm min-w-20 border-primary-light hover:border-primary-light hover:bg-primary-light border px-3 py-1 rounded-full ' onClick={()=>setopenprofileavataredit(true)}>Edit  </button>

      {
        openprofileavataredit && (

          <Userprofileavataredit close={()=>setopenprofileavataredit(false)}></Userprofileavataredit>
        )

      }
      <form action="my-4 grid gap-4">
        <div className='grid'>
        <label htmlFor="name">Name</label>
        <input type="text" name="name" id="name" placeholder="enter your name"value={userdata.name} className='p-2 bg-blue-50 outline-none  border focus-within:border-primary-light rounded' onChange={handlechange}/>
        </div>
        <div className='grid'>
        <label htmlFor="email">Email</label>
        <input type="email" name="email" id="email" placeholder="enter your email"value={userdata.email} className='p-2 bg-blue-50 outline-none  border focus-within:border-primary-light rounded' onChange={handlechange}/>
        </div>
        <div className='grid'>
        <label htmlFor="mobile">Mobile Number</label>
        <input type="text" name="mobile" id="mobile" placeholder="enter your mobile"value={userdata.mobile|| ""} className='p-2 bg-blue-50 outline-none  border focus-within:border-primary-light rounded' onChange={handlechange}/>
        </div>
        <button className='border mt-3  py-2 px-4 border-primary-dark hover:bg-primary-light rounded'>SUBMIT</button>
      
      </form>
    </div>
  )
}

export default Profile
