import React, { useEffect, useState } from 'react'
import axios from '../../../../axiosConfig'
import { useNavigate } from 'react-router-dom';
const Friends = () => {
  const [userDetail , setUserDetail] = useState({}) ;
 const navigate = useNavigate() ;
 
  const getMyData = async() =>{
     try {
      const res =await axios.get(`/api/profile/followers/${JSON.parse(localStorage.getItem('user'))._id}`) ;
    setUserDetail(res.data)
    } catch (error) {
      console.log(error)
     }
  }

  const handleProClick = (id) =>{
    navigate(`/profile/${id}`) ;
    window.location.reload() ;
  };

  useEffect(()=>{
 getMyData() ;
  },[])
  return (
    <div>
          <h1 className='text-5xl ml-5 md:text-center font-serif text-purple-800 mt-7'>My Followers </h1>
     
     <div className="friends grid my-7 grid-cols-2 md:grid-cols-4 md:ml-9 mx-1">
     
{
  userDetail.followers?.map((followers)=>{
return(<>
  <div className="container flex gap-3" key={followers._id}>
        <img src={followers.photo} alt=""  className='w-14 h-14 mt-1 rounded-full' onClick={()=>handleProClick(followers._id)}/>
        <p className='self-center  md:text-lg'> {followers.name}</p>
        </div>
</>)
  })
}
       
      

     </div>
<hr /><hr /><hr />
    </div>
  )
}

export default Friends
