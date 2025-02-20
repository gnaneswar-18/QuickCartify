import React from 'react'
import UserMenu from '../components/usermenu.jsx'
import { Outlet } from 'react-router-dom'
const Dashboard = () => {
  return (
    <section className=' my-2'>
      <div className='  container h-[75vh]  mx-auto p-3 grid  grid-cols-4 gap-2'>
        <div className=' bg-white py-4  h-full rounded '> 
          <UserMenu></UserMenu>
        </div>
        <div className='bg-white  col-span-3 rounded'>
          <Outlet></Outlet>
        </div>
      </div>
    </section>
  )
}

export default Dashboard
