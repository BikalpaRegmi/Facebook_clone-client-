import React from 'react'
import ProfileDetails from './profileDetails'
import Photos from './photos'
import Posts from './Posts'
import Friends from './Friends'
import SignIn from '../authentication/SignIn'

const Account = () => {
  const token = localStorage.getItem('jwt');

  return (
    <div>
 {
  !token ? <SignIn/>

  : <>

      <ProfileDetails/>

      <nav className='mt-7 border-t-4 border-b-4'>
        <ul className='flex justify-around'>
          <li className='cursor-pointer text-lg active:underline'>Posts</li>
          <li className='cursor-pointer text-lg active:underline'>Friends</li>
          <li className='cursor-pointer text-lg active:underline'>Photos</li>
        </ul>
      </nav>

   <Posts/>

  <Friends/>
  
   <Photos/>
    
  </>
 }
</div>
  )
}

export default Account
