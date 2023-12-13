import React from 'react'
import { FaHome, FaUserFriends } from 'react-icons/fa'
import { MdAccountCircle, MdNotifications } from 'react-icons/md'
import { NavLink } from 'react-router-dom'

const MblNav = () => {
  return (
    <div>
       <div className="container fixed sm:mx-9 bg-white bottom-0 ">      
         <div className="mobile  flex  text-purple-900 py-3 border-t-2 text-3xl justify-around md:hidden ">
    <NavLink>  <FaHome className='cursor-pointer'/> </NavLink> 
      <FaUserFriends className='cursor-pointer' title='Friends'/>
      <MdNotifications className='cursor-pointer' title='Notifications'/>
      <MdAccountCircle className='cursor-pointer' title='Profile'/>
      </div>
      </div>  
    </div>
  )
}

export default MblNav
