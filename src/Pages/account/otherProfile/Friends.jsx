import React, { useEffect, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom';
import axios from '../../../../axiosConfig'
const Friends = () => {

  const {id} = useParams() ;
 const [userDetail , setUserDetail] = useState({}) ;
 const navigate = useNavigate()

 const handleOthers = (id) =>{
  if(id == JSON.parse(localStorage.getItem('user'))._id) navigate('/myprofile')
 else  navigate(`/profile/${id}`)
  window.location.reload() ;
 }
  const getData = async()=>{
    try {
     const res = await axios.get(`/api/profile/followers/${id}`)
    setUserDetail(res.data)
    } catch (error) {
     console.log(error)
    }
   }
   useEffect(()=>{
   getData() ;
   },[])
  return (
    <div>
          <h1 className='text-5xl ml-5 md:text-center font-serif text-purple-800 mt-7'> Followers </h1>
     
     <div className="friends grid my-7 grid-cols-2 md:grid-cols-4 md:ml-9 mx-1">
   {
    userDetail.followers?.map((users)=>{
     return(
      <div className="container flex gap-3" key={users._id}>
    
        <img onClick={()=>handleOthers(users._id)} src={users.photo} alt=""  className='w-14 h-14 mt-1 rounded-full'/>
   
        <p className='self-center  md:text-lg'> {users.name} </p>
        </div>
        )
    })
   }
        

     </div>

    </div>
  )
}

export default Friends
