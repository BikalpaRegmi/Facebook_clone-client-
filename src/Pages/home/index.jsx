import React from 'react'
import Post from './post'
import Mind from './mind'
import SignIn from '../authentication/SignIn'

const Home = () => {
  const token = localStorage.getItem('jwt')
  return (
    <div>
    {
      !token ? <SignIn/>
      : (<>
        <Mind/>
   <Post/>
      </>)
    }
    
    </div>
  )
}

export default Home
