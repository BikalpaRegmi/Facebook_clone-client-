import React, { useEffect, useState } from 'react'
import axios from '../../../axiosConfig'

const Notify = () => {
  const [myDetail , setMyDetail] = useState({});

  const getMyDetail = async() =>{
try {
  const res = await axios.get(`/api/profile/user/${JSON.parse(localStorage.getItem('user'))._id}`) ;
  setMyDetail(res.data)
} catch (error) {
  console.log(error)
}
  }

  useEffect(()=>{
getMyDetail() ;
  },[myDetail])

  return (
    <div>
       
    </div>
  )
}

export default Notify
