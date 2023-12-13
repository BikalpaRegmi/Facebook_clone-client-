import React, { useState } from 'react'
import Logo from './Logo'
import { MdSearch } from "react-icons/md";
import { FiMessageSquare } from "react-icons/fi";
import Navigations from './pcNav';

const Nav = () => {
  const [search , setSearch] = useState(false)

  return (
    <div >
    <div className="container mx-auto bg-white w-full flex justify-between md:p-0 p-3 shadow-md py-3 shadow-purple-300" >
    <div className="logo mt-3 cursor-pointer" title='home'>
      <Logo/>
    </div>
    <div className="right flex gap-7 mt-3">
    <Navigations />

    { search ? (<div className=' md:flex gap-1 '>
      <MdSearch className=' text-5xl bg-purple-100 rounded-full p-2 text-purple-800 cursor-pointer' title='search' onClick={()=>setSearch(false)}/>
      <input type='text' className=' md:hidden border-2 border-black py-2 text-lg rounded-full  pl-3 place-self-start md:mt-2 mt-4 absolute left-0 w-10/12 mx-auto right-10 ' placeholder='Search'/>
   </div> )
      : 
      (<>
      <input type='text' className='hidden md:block border-2 text-lg rounded-full pl-3' placeholder='Search'/>
      <MdSearch className=' text-5xl bg-purple-100 rounded-full p-2 text-purple-800 cursor-pointer md:hidden' title='search' onClick={()=>setSearch(true)}/>
      <MdSearch className=' text-5xl hidden md:block bg-purple-100 rounded-full p-2 text-purple-800 cursor-pointer' title='search'/>
    </>  )

    }

     <span className='flex '> <FiMessageSquare className='text-purple-800 p-2 text-5xl rounded-full  bg-purple-100 cursor-pointer' title='messages'/><p className='font-semibold text-red-900 text-sm'>0</p></span> 
    </div>
    </div>
    </div>
  )
}

export default Nav
