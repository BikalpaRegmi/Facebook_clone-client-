import React from 'react'
import { MdNotifications } from "react-icons/md";
import { FaUserFriends } from "react-icons/fa";
import { MdAccountCircle } from "react-icons/md";
import { NavLink } from 'react-router-dom';

const Navigations = () => {
  return (
    <div>
      <div className="pc hidden  md:block text-3xl mx-auto mt-2 text-purple-700">
      <div className="navs flex gap-10 ">
      <NavLink to='/friends' > <FaUserFriends className='cursor-pointer' title='Friends'/> </NavLink>
      <NavLink to='/notifications' > <MdNotifications className='cursor-pointer' title='Notifications'/> </NavLink>
      <NavLink to='/profile' > <MdAccountCircle className='cursor-pointer' title='Profile'/> </NavLink>
      </div>
      </div>
    </div>
  )
}

export default Navigations
