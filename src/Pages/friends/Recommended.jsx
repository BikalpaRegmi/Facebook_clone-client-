import React, { useEffect, useState } from 'react'
import { SlUserFollow } from "react-icons/sl" ;
import axios from '../../../axiosConfig' ;
import { Link } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Recommended = () => {
    const [myFDetail , setMyFDetail] = useState([]) ;
    const [myDetail , setMyDetail] = useState({}) ;
      
    const [rpeoples , setRpeoples] = useState([]) ;

    const getMyData = async() =>{
        try {
           const res = await axios.get(`/api/profile/user/${JSON.parse(localStorage.getItem('user'))._id}`) ;
           const followings = res.data.followings?.map((following)=>following._id) ;
           setMyFDetail( followings) ;
           setMyDetail(res.data);
           
        } catch (error) {
            console.log(error)
        }
    }

    const getAllProfile = async() =>{
try {
    const res = await axios.get('api/profile/getallpeople') ;
   
    setRpeoples(res.data);


} catch (error) {
    console.log(error)
}
    }
    const handleFollow = async(id) =>{
        try {
      
        await axios.patch('/api/profile/follow' ,  {userFollowId : id } , { 
            headers : {
            authorize : 'Bearer ' + localStorage.getItem('jwt')
          }} ) ;
        toast.success(`followed sucessfully`);
        } catch (error) {
          console.log(error)
        }
      }
useEffect(()=>{
    getMyData();
    getAllProfile();

},[myDetail])



  
  return (
    <div>
    <p className='text-xl text-purple-700 drop-shadow-lg font-bold text-center my-3'> Recommended Users </p>

        <div className="main grid sm:grid-cols-2  grid-cols-1 mx-3 md:grid-cols-3">


        {rpeoples.length && myDetail.followings && rpeoples.filter((curval) => 
  rpeoples.length !== myDetail.followings.length &&
  !myFDetail.includes(curval._id) &&
  myDetail._id !== curval._id
).map((curval) => (
  <span className='flex justify-around ml-1 mt-3 bg-purple-100 shadow-md' key={curval._id}>
    <Link to={`/profile/${curval._id}`}>
      <img src={curval.photo} alt="" className='rounded-full w-12 h-12' />
    </Link>
    <p className='self-center text-lg capitalize font-mono'>{curval.name}</p>
    <button className='bg-purple-900 text-white h-9 px-1 font-bold mt-1 rounded-xl pt-2 flex gap-1' onClick={() => handleFollow(curval._id)}>
      <SlUserFollow className='text-xl' /> Follow
    </button>
  </span>
))}



       <ToastContainer/>

     </div>
    </div>
  )
}

export default Recommended
