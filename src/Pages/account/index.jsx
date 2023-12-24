import React, { useState } from 'react'
import ProfileDetails from './profileDetails'
import Photos from './photos'
import Posts from './Posts'
import Friends from './Friends'
import SignIn from '../authentication/SignIn'
import axios from '../../../axiosConfig'
const Account = () => {
  
  const token = localStorage.getItem('jwt');

  const [myPosts , setMyPosts] = useState([])
  const [showPosts, setShowPosts] = useState(true) ;
  
  const getMyPosts = async() =>{
    try {
      const axiosHeaders = {
        headers : {
          authorize : 'Bearer ' + localStorage.getItem('jwt')
        }
      }
     const res = await axios.get('/api/post/mypost' , axiosHeaders) ;
    setMyPosts(res.data.reverse())
    } catch (error) {
     console.log(error)
    }
      }

  return (
    <div>
 {
  !token ? <SignIn/>

  : <>

      <ProfileDetails/>

      <nav className='mt-7 border-t-4 border-b-4'>
        <ul className='flex justify-around'>
          <li className='cursor-pointer text-lg active:underline' onClick={()=>setShowPosts(true)}>Posts</li>
          <li className='cursor-pointer text-lg active:underline' onClick={()=>setShowPosts(false)}>Friends</li>
          <li className='cursor-pointer text-lg active:underline' onClick={()=>setShowPosts(false)}>Photos</li>
        </ul>
      </nav>

{
  showPosts ?  <Posts myPosts={myPosts} getMyPosts={getMyPosts}/> :   <Friends/>
}
  
<Photos myPosts={myPosts} getMyPosts={getMyPosts}/>
  
  
  
    
  </>
 }
</div>
  )
}

export default Account
