import React, { useEffect, useState } from 'react'
import { SlUserUnfollow } from "react-icons/sl";
import { SlUserFollow } from "react-icons/sl";
import axios from '../../../axiosConfig'
import { Link } from 'react-router-dom'
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const FollowBack = () => { 
    const [myDetail , setMyDetail] = useState({});

    const [filteredFollowers, setFilteredFollowers] = useState([]);


    const getMyData = async() =>{
        try {
         const res = await axios.get(`/api/profile/followers/${JSON.parse(localStorage.getItem('user'))._id}`) ;
    
       setMyDetail(res.data) ;

       const followersNotInFollowings = res.data.followers.filter(
        (follower) => !res.data.followings.includes(follower._id)
      );
      setFilteredFollowers(followersNotInFollowings) ;
    
       } catch (error) {
         console.log(error)
        }
     }

 useEffect(()=>{
getMyData() ;
 },[myDetail])

    const handleFollow = async(id) =>{
        try {
      
        await axios.patch('/api/profile/follow' ,  {userFollowId : id } , { 
            headers : {
            authorize : 'Bearer ' + localStorage.getItem('jwt')
          }} ) ;
        toast.success(`followed back sucessfully`)
        } catch (error) {
          console.log(error)
        }
      }
     
      

    return (
    <div>
    <p className='text-2xl drop-shadow-lg text-purple-700 font-bold text-center my-3'>Followers that you might wanna followBack</p>
        <div className="main gap-3 grid sm:grid-cols-2  grid-cols-1 mx-3 md:grid-cols-3">
        


{
    filteredFollowers.map((followers)=>{
        return (<>
            <span className='flex  justify-around mt-3 bg-purple-100 shadow-md'>
            <Link to={`/profile/${followers._id}`}>

        <img src={followers.photo} alt="" className='rounded-full h-12 w-12'/>
            </Link>
        <p className='self-center text-lg capitalize font-mono'>{followers.name}</p>
        <button className='bg-purple-900 text-white h-9 px-1 font-bold mt-1 rounded-xl pt-2 flex gap-1' onClick={()=>handleFollow(followers._id)}> <SlUserFollow className='text-xl'/> Follow Back </button>
</span> 
        </>)
    })
}



        <ToastContainer/>

      </div>
    </div>
  )
}

export default FollowBack
