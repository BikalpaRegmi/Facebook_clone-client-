import React from 'react'
import { MdNotifications } from "react-icons/md";
import { FaUserFriends } from "react-icons/fa";
import { MdAccountCircle } from "react-icons/md";

const Navigations = () => {
  return (
    <div>
      <div className="pc hidden md:block text-3xl mx-auto mt-2 text-purple-700">
      <div className="navs flex gap-10 ">
      <FaUserFriends className='cursor-pointer' title='Friends'/>
      <MdNotifications className='cursor-pointer' title='Notifications'/>
      <MdAccountCircle className='cursor-pointer' title='Profile'/>
      </div>
      </div>
    </div>
  )
}

export default Navigations
