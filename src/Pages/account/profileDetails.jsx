import React from 'react'
import { FiEdit3 } from "react-icons/fi";
import { IoIosAdd } from "react-icons/io";
import { MdPeopleAlt } from "react-icons/md";

const ProfileDetails = () => {
  return (
    <div className=''>
      <div className="container flex justify-around md:flex-row flex-col mx-auto">
        <div className="image_name mt-7 bg-purple-950 w-72 border-12 rounded-full flex  mx-auto">
         <img src="dummyProfile.png" alt="" className='rounded-full h-48 w-52 shadow-xl'/>
         <IoIosAdd className='self-center text-9xl cursor-pointer text-white'/>
        </div>

        <div className="totalFriends_name mt-3 my-auto">
        <p  className='text-5xl text-center capitalize'> {JSON.parse(localStorage.getItem('user')).name}</p>
         <i className=' mx-16 text-center'>99 friends</i>
         </div>

        

        <div className="buttons flex justify-center md:my-auto mt-9 gap-1 mx-1">
           <button className='flex bg-purple-900 py-3 px-5  text-white gap-1  rounded-full'><FiEdit3 className='text-2xl mt-1'/> <b>Edit profile</b></button>
           <button className='flex bg-purple-900 py-3 px-5  text-white gap-1  rounded-full'><MdPeopleAlt className='text-2xl mt-1'/> <b>Peoples you may know</b></button>
        </div>
      </div>
    </div>
  )
}

export default ProfileDetails
