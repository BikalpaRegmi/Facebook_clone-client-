import React, { useEffect, useState } from 'react'
import Logo from './Logo'
import { MdSearch } from "react-icons/md";
import { FiMessageSquare } from "react-icons/fi";
import Navigations from './pcNav';
import {  NavLink, useNavigate } from 'react-router-dom';
import axios from '../../../axiosConfig'
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';const Nav = () => {
  const [search , setSearch] = useState(false);
  const [searchRes , setSearchRes] = useState('');
  const [users , setUsers] = useState([])
  const navigate = useNavigate()
console.log(searchRes) ;
  const getAllUser = async() =>{
       try {
        const res = await axios.get('/api/profile/getallpeople') ;
setUsers(res.data) ;
      } catch (error) {
        console.log(error)
       }
  }
  const handleClick = (id) =>{
    if(id === JSON.parse(localStorage.getItem('user'))._id) {
      navigate('/myprofile');
      window.location.reload()

    }
   else{ 
    navigate(`/profile/${id}`) ;
   window.location.reload()
  }
  }
  useEffect(()=>{
getAllUser() ;
  },[searchRes])

  return (
    <div >
    <div className="container mx-auto bg-white w-full flex justify-between md:p-0 p-3 shadow-md py-3 shadow-purple-300" >
    <div className="logo mt-3 cursor-pointer" title='home'>
      <Logo/>
    </div>
    <div className="right flex gap-7 mt-3">
    <Navigations />

    { search ? (<>
      <div className=' md:flex gap-1 '>
      <MdSearch className=' text-5xl bg-purple-100 rounded-full p-2 text-purple-800 cursor-pointer' title='search' onClick={()=>{setSearch(false) ; setSearchRes('')}}/>
      <input type='text' className=' md:hidden border-2 border-black py-2 text-lg rounded-full  pl-3 place-self-start md:mt-2 mt-4 absolute left-0 w-10/12 mx-auto right-10' value={searchRes} onChange={(e)=>setSearchRes(e.target.value)} placeholder='Search People'/>
   </div> 
  
   </>)
      : 
      (<>
      <input type='text' className='hidden md:block border-2  text-lg rounded-full pl-3' value={searchRes} onChange={(e)=>setSearchRes(e.target.value)} placeholder='Search People'/>
      <MdSearch className=' text-5xl bg-purple-100 rounded-full p-2 text-purple-800 cursor-pointer md:hidden' title='search' onClick={()=>setSearch(true)}/>
      <MdSearch className=' text-5xl hidden md:block bg-purple-100 rounded-full p-2 text-purple-800 cursor-pointer' title='search' onClick={()=>{
        if (searchRes.length > 0) toast.error(`Cant find "${searchRes}"`, {
position: "top-center",
autoClose: 5000,
hideProgressBar: false,
closeOnClick: true,
pauseOnHover: true,
draggable: true,
progress: undefined,
theme: "dark",
});
       else toast.error('plz search first', {
position: "top-center",
autoClose: 5000,
hideProgressBar: false,
closeOnClick: true,
pauseOnHover: true,
draggable: true,
progress: undefined,
theme: "dark",
});}}/>
    </>  )

    }
  
   <NavLink to={'/msg'} >
     <span className='flex '> <FiMessageSquare className='text-purple-800 p-2 text-5xl rounded-full  bg-purple-100 cursor-pointer' title='messages'/>
     <p className='font-semibold text-red-900 text-sm'>0</p></span> 
   </NavLink>
    </div>
    </div> 

    <div className='searchResults mt-[53px] absolute bg-purple-900 md:w-96 md:right-36 md:top-3 px-3 w-full'>
    {
     searchRes && users.filter((user)=>user.name.toLowerCase().includes(searchRes.toLowerCase())).map((users)=>{
        return (<>
     <span className='flex gap-3 justify-center text-white border-b-4 border-b-white cursor-pointer hover:bg-green-700' onClick={()=>handleClick(users._id)}>
    <img src={users.photo} alt="" className='w-10 h-10 rounded-full'/>
    <p className='font-semibold mt-1'>{users.name}</p>
    <p className='mt-1'>({users.followers.length}) Followers</p>
  </span>
 
        </>)
      })
     
     
    }
  
 
    </div> 
    <ToastContainer/>    </div>
  )
}

export default Nav
