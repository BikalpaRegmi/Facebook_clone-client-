import React, { useEffect, useState } from 'react'
import { BsThreeDots } from "react-icons/bs";
import { BiLike } from "react-icons/bi";
import { FaRegComment,FaShare } from "react-icons/fa6";
import axios from '../../../axiosConfig'
import { AiOutlineLoading } from "react-icons/ai";


const Post = () => {
 const [posts , setPosts] = useState([]) ;
 const [loading , setLoading] = useState(true)
 const [postUpdateTrigger , setPostUpdateTrigger] = useState(false)

 const getallpost = async() =>{
 try {
   const res = await axios.get('/api/post/getallpost') ;
   setPosts(res.data.reverse()) ;
   setLoading(false)
 } catch (error) {
   console.log(error) ;
 }
 }

 useEffect(()=>{
    getallpost() ;
 },[postUpdateTrigger])

 const imgClick = (img)=>{

  window.open(img, '_blank');
  
 }
 const likedPost = async(id) =>{
  try {
      await axios.patch('/api/post/likes' ,{postId:id} , {
      headers: {
        authorize: 'Bearer ' + localStorage.getItem('jwt')
      }
    });
  setPostUpdateTrigger(!postUpdateTrigger)
  } catch (error) {
    console.log(error)
  }
 }
const unLikePost = async(id)=>{
  try {
   await axios.patch('/api/post/unlike' , {postId : id} , {
      headers: {
        authorize: 'Bearer ' + localStorage.getItem('jwt')
      }
    });
   setPostUpdateTrigger(!postUpdateTrigger)
  } catch (error) {
    console.log(error)
  }
}

  return (
    <>
    {
      loading ? <div>
       <p className='text-7xl mt-7 flex justify-center gap-9'>Loading plz wait... <AiOutlineLoading className='animate-spin text-purple-900 font-bold'/></p> 
      </div>
      :
       posts.map((post,id)=>{
  return ( 
    <div key={post._id}>
      <div className="wrapper bg-slate-50 md:w-[777px] px-7 mx-auto mt-7 rounded-3xl">

        <div className="head flex justify-between pt-1 ">

        <span className="profile flex gap-3 ">
          <img src="dummyProfile.png" alt="" className='rounded-full w-12 h-12 cursor-pointer' title='profile'/>
          <p className='flex flex-col capitalize'>{post.postedBy.name} <i className='text-sm font-light'>3 days ago</i></p>
        </span>

        <span className="menu mt-3 ">
      <BsThreeDots className='text-xl cursor-pointer hover:text-purple-700' title='menu'/>
        </span>

        </div>

        <div className="image mt-5 md:px-9">
        <p className='mb-1'>{post.caption}</p>
    <img src={post.picture} alt="" className=' w-full mt-3 cursor-pointer' onClick={()=>imgClick(post.picture)}/>
        </div>

        <div className="bottom flex border-t-2 justify-between text-3xl md:px-14 px-3 mt-3">
        {
          post.likes.includes(JSON.parse(localStorage.getItem('user'))._id) ? 
          (
            <div className='flex flex-col'>
     <span className="like flex text-lg gap-1 cursor-pointer " onClick={()=>unLikePost(post._id)}><BiLike className='mt-1 text-purple-700 text-3xl cursor-pointer' title='like'/> <p className='mt-1 text-purple-700' >Liked ({post.likes.length})</p></span>
     <i className='text-sm'>( You and {post.likes.length -1} others)</i>

            </div>
          )
           : 
           (
            <div className='flex flex-col'>
        <span className="like flex text-lg gap-1 cursor-pointer hover:text-purple-900" onClick={()=>likedPost(post._id)}><BiLike className='mt-1 text-black text-3xl cursor-pointer' title='like'/>({post.likes.length}) </span>
        </div>
           )
        }
     <span className="comment flex text-lg gap-1 hover:text-purple-900"><FaRegComment className='mt-1 text-3xl cursor-pointer' title='comments'/>(9)</span>
     <span className="share flex text-lg gap-1 hover:text-purple-900"><FaShare className='mt-1 text-3xl cursor-pointer' title='share'/>(7)</span>
        </div>
      </div>
    </div>
  )
    })
    }
    </>
  )

}

export default Post
