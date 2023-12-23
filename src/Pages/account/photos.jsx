import React from 'react'
import { IoLogOut } from "react-icons/io5";

function Photos() {
  return (
    <>
    <h1 className='text-5xl ml-5 md:text-center font-serif text-purple-800'> Photos </h1>
    <div className='m-7 gap-3 grid grid-cols-2 md:grid-cols-3 '>
      <img src="dummyProfile.png" alt="" className='w-40 cursor-pointer md:w-96 md:h-96'/>
      <img src="dummyProfile.png" alt="" className='w-40 cursor-pointer md:w-96 md:h-96'/>
      <img src="dummyProfile.png" alt="" className='w-40 cursor-pointer md:w-96 md:h-96'/>

    </div>
      <p className='text-3xl bg-red-800 font-bold w-1/2 mx-auto gap-3 cursor-pointer hover:font-mono text-white text-center rounded-full flex justify-center' onClick={()=>{localStorage.clear() ; window.location.reload()}}>LogOut 
      <IoLogOut className='text-4xl'/></p>
    </> 
  )
}

export default Photos
