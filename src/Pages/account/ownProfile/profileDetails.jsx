import React, { useEffect, useRef, useState } from 'react'
import { FiEdit3 } from "react-icons/fi";
import { IoIosAdd } from "react-icons/io";
import { MdPeopleAlt } from "react-icons/md";
import axios from '../../../../axiosConfig' ;
import { useNavigate } from 'react-router-dom';

const ProfileDetails = ({setShowPosts}) => {
  const fileInputRef = useRef(null) ;
  const [selectedFile , setSelectedFile] = useState(null)
 const [image , setImage] = useState('')
 const [myDetail , setMyDetail] = useState({}) ;

const handlePictureClick = () =>{
fileInputRef.current.click() ;
}

const getMyData = async()=>{
 try {
  const res = await axios.get(`/api/profile/user/${JSON.parse(localStorage.getItem('user'))._id}`)
  setMyDetail(res.data) ;
 } catch (error) {
  console.log(error)
 }
}

useEffect(()=>{
getMyData() ;
},[])

const handleMyFollowings = () =>{
 setShowPosts(false)
}
const handleFileChange = (e) =>{ 
  const selectedFile = e.target.files[0];
  if (selectedFile) {
    setSelectedFile(selectedFile) ;
    setImage(selectedFile)
  }
}
const handlePP = async() =>{
  const data = new FormData() ;
  data.append('file', selectedFile) ;
  data.append('upload_preset', 'BiBook');
  data.append('cloud_name', 'bikalpacloud');

  try {
    console.log('Sending request to Cloudinary...');
    const response = await fetch('https://api.cloudinary.com/v1_1/bikalpacloud/upload', {
      method: 'POST',
      body: data,
    })

  const res = await response.json() ;
  
   
    await axios.patch('/api/profile/uploadPP' , {pic : res.url} ,{
    headers: {
      authorize: 'Bearer ' + localStorage.getItem('jwt')
    }
  });
    window.location.reload();
  }catch(error){
    console.log(error)
  }
}


  return (
    <div className=''>
      <div className="container flex justify-around md:flex-row flex-col mx-auto">
        <div className="image_name mt-7 bg-purple-950 w-72 border-12 rounded-full flex  mx-auto">
         <img src={myDetail.photo} alt="" className='rounded-full h-48 w-48 ml-1'/>
         <IoIosAdd className='self-center text-9xl cursor-pointer text-white' onClick={handlePictureClick}/>
         <input type="file"   style={{ display: 'none' }} ref={fileInputRef}  onChange={handleFileChange}/>
        </div>
       {
        selectedFile ? (<div className='rounded-xl mx-9'>
        <img src={URL.createObjectURL(selectedFile)} className='w-48 h-48 rounded-full  mx-auto'/> 
       <p className='bg-purple-900 cursor-pointer  w-32 text-center rounded-3xl mt-3 hover:bg-purple-950  text-white mx-auto text-xl ' onClick={handlePP}>Set profile</p>
        </div>)

        : ''
       }
        <div className="totalFriends_name mt-3 my-auto">
        <p  className='text-5xl text-center capitalize'> {JSON.parse(localStorage.getItem('user')).name}</p>
        <p className='text-center text-purple-900 font-semibold'>{myDetail.followers?.length} Followers</p>
         </div> 

        

        <div className="buttons flex justify-center md:my-auto mt-9 gap-1 mx-1">
           <button className='flex bg-purple-900 py-3 px-5  text-white gap-1  rounded-full'><FiEdit3 className='text-2xl mt-1'/> <b>Edit profile</b></button>
           <button className='flex bg-purple-900 py-3 px-5  text-white gap-1  rounded-full' onClick={handleMyFollowings}><MdPeopleAlt className='text-2xl mt-1' /> <b>My Followings</b></button>
        </div>
      </div>
    </div>
  )
}

export default ProfileDetails
