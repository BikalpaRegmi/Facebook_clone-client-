import React from 'react'
import { NavLink } from 'react-router-dom'

const Logo = () => {
  return (
    <div>
    <NavLink to={'/'}>
      <h1 className='text-purple-900 w-48 text-center text-5xl font-bold drop-shadow-lg contrast-125'>Bi Book</h1>
    </NavLink>
    </div>
  )
}

export default Logo
