import React, { useEffect, useLayoutEffect, useState } from 'react'
import { MdPeopleAlt } from "react-icons/md";
import { RiUserFollowFill,RiUserUnfollowFill } from "react-icons/ri";
import { useParams } from 'react-router-dom';
import axios from '../../../../axiosConfig'
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const ProfileDetails = ({setShowFriends,setShowPosts}) => {
  const {id} = useParams() ;
 const [userDetail , setUserDetail] = useState({});
 const [followerAlready , setFollowerAlready] = useState(false) ;

  const getUser = async() =>{
    try {
      const res = await axios.get(`/api/profile/user/${id}`) ;
     setUserDetail(res.data)
     if(res.data.followers.includes(JSON.parse(localStorage.getItem('user'))._id)){
      setFollowerAlready(true) ;
     }else       setFollowerAlready(false) ;
    } catch (error) {
      console.log(error)
    }
  }
useEffect(()=>{
getUser() ;
},[]) ;



const handleFollow = async() =>{
  try {

    const res = await axios.patch('/api/profile/follow' ,  {userFollowId : userDetail._id } , { 
      headers : {
      authorize : 'Bearer ' + localStorage.getItem('jwt')
    }} ) ;
    toast.success(`Followed ${userDetail.name}`)
   getUser()
  } catch (error) {
    console.log(error)
  }
}

const handleUnFollow = async() =>{
  try {

    const res = await axios.patch('/api/profile/unfollow' ,  {userFollowId : userDetail._id } , { 
      headers : {
      authorize : 'Bearer ' + localStorage.getItem('jwt')
    }} ) ;
   getUser()
  } catch (error) {
    console.log(error)
  }
}
const followerSec = () =>{
  setShowFriends(true) ;
  setShowPosts(false)
}

  return (
    <div className=''>
      <div className="container flex justify-between md:flex-row md:pr-24 flex-col mx-auto">
        <div className="image_name mt-7 bg-purple-950 p-1 w-48 border-12 rounded-full flex  mx-auto">
      <a href={userDetail.photo} target='blank'>
        <img src={userDetail.photo} alt="" className='rounded-full w-52 shadow-xl'/>
        </a>

        </div>

        <div className="totalFriends_name mt-3 md:mr-12 my-auto">
      
        <p  className='text-5xl text-center capitalize'>{userDetail.name}</p> 
         <p className='text-center text-purple-900 font-semibold' >{userDetail.followers?.length} Followers</p>
         </div>

        

        <div className="buttons flex justify-center md:my-auto mt-9 gap-9 mx-1">
        {
          followerAlready ? 
          <button onClick={handleUnFollow} className='flex bg-red-700 py-3 px-5   gap-1 text-white rounded-full'><RiUserUnfollowFill className='text-2xl  mt-1' /> <b>unFollow</b></button>
          :
           <button onClick={handleFollow} className='flex bg-purple-900 py-3 px-5  text-white gap-1  rounded-full'><RiUserFollowFill className='text-2xl mt-1' /> <b>Follow</b></button>
        }
           <button className='flex bg-purple-900 py-3 px-5  text-white gap-1  rounded-full' id='followers-section' onClick={followerSec}><MdPeopleAlt className='text-2xl mt-1' /> <b>Followers</b></button>
        </div>
      </div>
      <ToastContainer/>
    </div>
  )
}

export default ProfileDetails
