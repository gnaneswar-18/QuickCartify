import React from 'react'
import { useSelector } from 'react-redux'
import isAdmin from '../utils/isAdmin'

const Adminpermission = ({children}) => {
    const user=useSelector(state=>state.user)
  return (
   <>
    {isAdmin(user?.role)?
        children:<div className='bg-red-300 h-20 text-2xl text-center'>no permission</div>
    }</>
  )
}

export default Adminpermission
