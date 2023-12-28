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
          <img src={post.postedBy.photo} alt="" className='rounded-full w-12 h-12 cursor-pointer' title='profile'/>
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
        <img src={cmt.postedBy.photo} className='w-12 h-12 rounded-full' alt="" />
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
