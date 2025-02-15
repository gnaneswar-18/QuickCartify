import React from 'react'
import UserMenu from '../components/usermenu.jsx'
import { Outlet } from 'react-router-dom'
const Dashboard = () => {
  return (
    <section className=' my-2'>
      <div className='  container h-[75vh]  mx-auto p-3 grid grid-cols-[320px,1fr] gap-2'>
        <div className=' bg-white py-4  h-full'> 
          <UserMenu></UserMenu>
        </div>
        <div className='bg-white  '>
          <Outlet></Outlet>
        </div>
      </div>
    </section>
  )
}

export default Dashboard
