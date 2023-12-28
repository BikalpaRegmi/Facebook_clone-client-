import React, { useEffect } from 'react'
import { IoLogOut } from "react-icons/io5";
import { useParams } from 'react-router-dom';

function Photos({myPosts , getMyPosts }) {
const {id} = useParams()
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
      myPosts.filter((post)=>post.postedBy._id==id).map((photo)=>{
      return <img src={photo.picture} alt="" className='w-40 cursor-pointer md:w-96 ' onClick={()=>imgClick(photo.picture)} key={photo._id}/>
      })
    }
     

    </div>
     <hr /><hr /><hr /><hr /><hr /><hr /><hr />
    </> 
  )
}

export default Photos
