import React, { useEffect } from 'react'
import { IoLogOut } from "react-icons/io5";

function Photos({myPosts , getMyPosts }) {

  useEffect(()=>{
    getMyPosts() ;
  },[])

  const imgClick = (img) =>{
    window.open(img, '_blank');
  }  
  return (
    <>
    <h1 className='text-5xl ml-5 md:text-center font-serif text-purple-800'> Photos </h1>
    <div className='m-7 gap-3 grid grid-cols-2 md:grid-cols-3 '>

    {
      myPosts.map((photo)=>{
      return <img src={photo.picture} alt="" className='w-40 cursor-pointer md:w-96 ' onClick={()=>imgClick(photo.picture)} key={photo._id}/>
      })
    }
     

    </div>
      <p className='text-3xl bg-red-800 font-bold w-1/2 mx-auto gap-3 cursor-pointer hover:font-mono text-white text-center rounded-full flex justify-center' onClick={()=>{localStorage.clear() ; window.location.reload()}}>LogOut 
      <IoLogOut className='text-4xl'/></p>
    </> 
  )
}

export default Photos
