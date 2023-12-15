import React from 'react'
import { FiEdit3 } from "react-icons/fi";
import { IoIosAdd } from "react-icons/io";
import { MdPeopleAlt } from "react-icons/md";

const ProfileDetails = () => {
  return (
    <div>
      <div className="container flex justify-around md:flex-row flex-col ">
        <div className="image_name bg-purple-950 w-72 border-12 rounded-full flex  mx-auto">
         <img src="dummyProfile.png" alt="" className='rounded-full w-52 shadow-xl'/>
         <IoIosAdd className='self-center text-9xl cursor-pointer text-white'/>
        </div>

        <div className="totalFriends_name my-auto">
        <p  className='text-5xl text-center'> Bikalpa Regmi</p>
         <i className='md:mx-28 mx-12'>99 friends</i>
         </div>

        

        <div className="buttons flex md:my-auto mt-9 gap-1 mx-1">
           <button className='flex bg-purple-900 px-7 h-14 text-white text-xl gap-1 md:pt-3 rounded-full'><FiEdit3 className='text-2xl mt-1'/> <b>Edit profile</b></button>
           <button className='flex bg-purple-900 px-7 h-14 text-white text-xl gap-1 md:pt-3 rounded-full'><MdPeopleAlt className='text-2xl mt-1'/> <b>Peoples you may know</b></button>
        </div>
      </div>
    </div>
  )
}

export default ProfileDetails
