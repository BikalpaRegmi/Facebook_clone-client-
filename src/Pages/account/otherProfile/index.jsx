import React, { useContext, useState } from 'react'
import ProfileDetails from './profileDetails'
import Photos from './photos'
import Posts from './Posts'
import Friends from './Friends'
import SignIn from '../../authentication/SignIn'
import axios from '../../../../axiosConfig'
import { useParams } from 'react-router-dom'
const Account = () => {
  
  const token = localStorage.getItem('jwt');
 const {id} = useParams()
  const [myPosts , setMyPosts] = useState([])
  const [showPosts, setShowPosts] = useState(true) ;
  const [showFriends, setShowFriends] = useState(false);

  const getMyPosts = async() =>{
    try {
     const res = await axios.get(`/api/post/getallpost` ) ;
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

      <ProfileDetails setShowPosts={setShowPosts}  setShowFriends = {setShowFriends} />

      <nav className='mt-7 border-t-4 border-b-4'>
        <ul className='flex justify-around'>
          <li className='cursor-pointer text-lg active:underline' onClick={()=>{setShowPosts(true) ; setShowFriends(false)}}>Posts ({myPosts.filter((post)=>post.postedBy._id === id).length})</li>
          <li className='cursor-pointer text-lg active:underline' onClick={()=>{setShowPosts(false) ; setShowFriends(false)}}>Photos ({myPosts.filter((post)=>post.postedBy._id === id).length})</li>
        </ul>
      </nav>

{
  showPosts && !showFriends ?  <Posts myPosts={myPosts} getMyPosts={getMyPosts}/> : !showFriends && !showPosts ?<Photos myPosts={myPosts} getMyPosts={getMyPosts}/>   : <Friends />
}

 

  
  
  
    
  </>
 }
</div>
  )
}

export default Account
