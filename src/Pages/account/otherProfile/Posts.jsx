import React, { useEffect, useState } from 'react'
import { BiLike } from 'react-icons/bi'
import { BsThreeDots } from 'react-icons/bs'
import { FaRegComment, FaShare } from 'react-icons/fa6'
import axios from '../../../../axiosConfig'
import { CiCircleRemove } from "react-icons/ci";
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useParams } from 'react-router-dom'

const Posts = ({myPosts , getMyPosts}) => {
  const {id} = useParams();
  const [updateTrigger, setUpdateTrigger] = useState(false);
  const [openCommentsPostId, setOpenCommentsPostId] = useState(null); 
  const [comment , setComment] = useState('')
  const [toggleDotsId , setToggleDotsId] = useState(null)

  const imgClick = (img)=>{
        window.open(img, '_blank');
       }

       const handleCmntOpen = (postId) =>{
  setOpenCommentsPostId((prevId) => (prevId === postId ? null : postId));
 }

 const handleDots = (id) =>{
 setToggleDotsId((prevId) => (prevId != id ? id : null))
}
 const makeComment = async(id , cmt) =>{
   await axios.patch('/api/post/comment' , {postId : id , comment : cmt} , {
    headers: {
      authorize: 'Bearer ' + localStorage.getItem('jwt')
    }
  }) ;
  setUpdateTrigger(!updateTrigger);
  setComment('')
}
     
  useEffect(()=>{
   getMyPosts() ;
  },[updateTrigger])


  const handleDelete = async(id) =>{
  try {
    await axios.delete(`/api/post/deletePost/${id}`) ;
    setUpdateTrigger(!updateTrigger);
    toast.warn('post deleted successfully')
  } catch (error) {
    console.log(error)
  }
  }
  const likedPost = async (id) => {
    try {
      await axios.patch('/api/post/likes', { postId:id }, {
        headers: {
          authorize: 'Bearer ' + localStorage.getItem('jwt')
        }
      });
      setUpdateTrigger(!updateTrigger);
    } catch (error) {
      console.log(error);
    }
  }


  const unLikedPost = async (id) => {
    try {
      const res = await axios.patch('/api/post/unlike', { postId:id }, {
        headers: {
          authorize: 'Bearer ' + localStorage.getItem('jwt')
        }
      });
      setUpdateTrigger(!updateTrigger);
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div>
    <h1 className='text-5xl ml-5 md:text-center font-serif text-purple-800'> Posts </h1>
    {
      myPosts.filter((post)=>post.postedBy._id==id).map((post)=>{
        return ( 
    <div key={post._id}>
      <div className="wrapper bg-slate-50 md:w-[777px] px-7 mx-auto mt-7 rounded-3xl">

        <div className="head flex justify-between pt-1 ">

        <span className="profile flex gap-3 ">
          <img src="data:image/jpeg;base64,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" alt="" className='rounded-full w-12 h-12 cursor-pointer' title='profile'/>
          <p className='flex flex-col capitalize'> {post.postedBy.name} <i className='text-sm font-light'>{new Date(post.createdAt).toLocaleString()}</i></p>
        </span>

        <span className="menu mt-3 relative">
        {
    (post.postedBy._id === JSON.parse(localStorage.getItem('user'))._id && toggleDotsId === post._id) ||
    (post.postedBy._id !== JSON.parse(localStorage.getItem('user'))._id && toggleDotsId === post._id) ? (
      <CiCircleRemove className='text-3xl cursor-pointer  hover:text-purple-700 '  onClick={()=>handleDots(post._id)}/>
    ) : (
      <BsThreeDots className='text-2xl cursor-pointer  hover:text-purple-700' title='menu' onClick={()=>handleDots(post._id)}/>
    )
  }
  
  {
    post.postedBy._id === JSON.parse(localStorage.getItem('user'))._id && toggleDotsId === post._id ? (
      <button className='font-bold bg-red-700 absolute right-0.5 w-40 text-white px-7 rounded-full' onClick={()=>handleDelete(post._id)}>Delete post</button>
    ) : post.postedBy._id !== JSON.parse(localStorage.getItem('user'))._id && toggleDotsId === post._id ? (
      <button className='font-bold bg-red-700 absolute right-0.5 w-40 text-white px-7 rounded-full'>Report</button>
    ) : null
  }
        </span>

        </div>

        <div className="image mt-5 md:px-9">
        <p className='mb-1'>{post.caption}</p>
    <img src={post.picture} alt="" className=' w-full mt-3 cursor-pointer' onClick={()=>imgClick(post.picture)}/>
        </div>
 
        <div className="bottom flex border-t-2 justify-between text-3xl md:px-14 pb-3 px-3 mt-3">
        {
          post.likes.includes(JSON.parse(localStorage.getItem('user'))._id) ?(<div className='flex flex-col'>
     <span className="like flex text-lg gap-1 cursor-pointer" onClick={()=>unLikedPost(post._id)}><BiLike className='mt-1 text-purple-700 text-3xl cursor-pointer' title='like'/> <p className='mt-2 text-purple-700'>Liked ({post.likes.length}) </p> </span> 
     <i className='text-sm'>(you and {post.likes.length -1 } others)</i>
          </div>
          )
     :
     (
      <div className='flex flex-col'>
        <span className="like flex text-lg gap-1 cursor-pointer hover:text-purple-900" onClick={()=>likedPost(post._id)}><BiLike className='mt-1 text-black text-3xl cursor-pointer' title='like'/>({post.likes.length}) </span>
      </div>
     )
        }
        <span className="comment flex text-lg gap-1 hover:text-purple-900"><FaRegComment onClick={()=>handleCmntOpen(post._id)} className='mt-1 text-3xl cursor-pointer' title='comments'/>
     <p className='flex flex-col'> <i>({post.comments.length})</i></p>
     </span>
          <span className="share flex text-lg gap-1 hover:text-purple-900"><FaShare className='mt-1 text-3xl cursor-pointer' title='share'/>(7)</span>
        </div>
      </div>
      {
      openCommentsPostId === post._id ?
      (
        <>
     
     <div className='overflow-scroll h-48'>

{
  [...post.comments].reverse().map((cmt)=>{
return (  <div className='flex gap-3 bg-purple-100 my-3 border-b-2' key={cmt._id}>
        <img src="dummyProfile.png" className='w-12 h-12 rounded-full' alt="" />
        {cmt.postedBy && cmt.postedBy.name ? (
    <p className=' font-light text-black flex-col flex'>
      <b className='capitalize'>{cmt.postedBy.name}</b>
      {cmt.comment}
    </p>
  ) : (
    <p className=' font-light text-black flex-col flex'>
      <b className='capitalize'>Unknown User</b>
      {cmt.comment}
    </p>
  )}       </div>
   ) })
}
       
       </div>

       <div className='w-full bg-purple-900 mt-1 rounded-xl'>
       <input type="text" value={comment} onChange={(e)=>setComment(e.target.value)} className="md:w-10/12 sm:w-10/12 h-9  rounded-md bg-gray-100 pl-3" placeholder='write a comment'/>
       <button className='text-white ml-3 font-bold' onClick={()=>makeComment(post._id , comment )}>Comment</button>
        </div>
        </>
      )
      : ''
     }
    </div>
  )
      })
    }
    <ToastContainer/>
    </div>
  )
}

export default Posts
