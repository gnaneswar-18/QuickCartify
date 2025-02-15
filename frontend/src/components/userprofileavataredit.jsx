import React, { useState } from 'react'
import { FaRegUserCircle } from 'react-icons/fa'
import { useDispatch, useSelector } from 'react-redux'
import Axios from '../utils/Axios'
import summaryapi from '../common/summaryapi'
import AxiosToastError from '../utils/AxiosToastError.jsx'
import { updateavatar } from '../store/userslice.js'
const Userprofileavataredit = ({ close }) => {
  const dispatch = useDispatch();
  const user = useSelector(state => state.user)
  const [loading, setloading] = useState(false)
  const handlesubmit = (e) => {
    e.preventDefault()
  }
  const handleupload = async (e) => {
    setloading(true)
    const file = e.target.files[0]
    if (!file) { return }
    const formData = new FormData()
    formData.append('avatar', file)

    try {
      const response = await Axios({
        ...summaryapi.uploadavatar,
        data: formData
      })
      if (response.data.success) {
        console.log(response)
        dispatch(updateavatar(response.data.data.avatar))
        close()
        toast.success('Avatar updated successfully')
      }
      setloading(false)

    } catch (error) {
      AxiosToastError(error)
    }

  }

  return (
    <section className='fixed top-0 bottom-0 left-0 right-0 bg-neutral-900 bg-opacity-60 p-4 flex items-center justify-center'>
      <div className='bg-white max-w-sm w-full rounded p-4'>
        <h1 className='text-center p-3 text-2xl'>Edit Profile Avatar</h1>
        <div className='flex items-center justify-center w-full  pb-6'>
        <div className="w-20 h-20 rounded-full overflow-hidden flex justify-center items-center  ">
          {user.avatar ? (
            <img src={user.avatar} alt="avatar" className="w-full h-full object-cover " />
          ) : (
            <FaRegUserCircle size={65} className="text-gray-400" />
          )}
        </div>

        </div>
        

        <form onSubmit={handlesubmit}>
          <label htmlFor="image" >
            <div className=' cursor-pointer text-center w-full bg-primary-light text-white py-2 px-4 rounded-md'>
              {loading ? "Loading..." : "Upload"}
            </div>
          </label>
          <input type="file" name="" id="image" className='hidden' onChange={handleupload} />
        </form>
        <button className='w-full mt-4 bg-gray-500 text-white py-2 px-4 rounded-md ' onClick={close}>Cancel</button>
      </div>

    </section>
  )
}

export default Userprofileavataredit
