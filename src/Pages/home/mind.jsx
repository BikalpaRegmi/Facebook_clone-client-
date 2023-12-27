import React, { useEffect, useRef, useState } from 'react';
import { AiFillPicture } from 'react-icons/ai';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from '../../../axiosConfig';

const Mind = () => {
  const fileInputRef = useRef(null);
  const [selectedFile, setSelectedFile] = useState(null);
  const [postData , setPostData] = useState({
    caption : '',
    picture : '',
  })

  const handlePictureClick = () => {
    fileInputRef.current.click();
  };

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile) {
      const blobUrl = URL.createObjectURL(selectedFile);
      setSelectedFile(blobUrl);
      setPostData({ ...postData, picture: selectedFile });
    }
  };

 
 const handlePost = async()=>{

  const data = new FormData();
  data.append('file', postData.picture);
  data.append('upload_preset', 'BiBook');
  data.append('cloud_name', 'bikalpacloud');

  try {
    console.log('Sending request to Cloudinary...');
    toast.success('Posting...')
    const response = await fetch('https://api.cloudinary.com/v1_1/bikalpacloud/upload', {
      method: 'POST',
      body: data,
    })
  const res = await response.json() 

  const axiosHeaders = {
    headers: {
      authorize: 'Bearer ' + localStorage.getItem('jwt'),
    },
  };

  if(!selectedFile && postData.caption ==='') {
    toast.error('plz select a picture or write some text before posting')
  }
 else{
  const res2 = await axios.post('/api/post/createpost' , { ...postData , picture: res.url } , axiosHeaders );
  if(res2.data.error === 'You need to log in') toast.error(`You've gotta login first !`)
 
  else {
   
   setTimeout(() => {
     window.location.reload()
   }, 3333);
  }

 }
   




  } catch (error) {
  console.log(error)
 }

 
 }
 const handleChange = (event)=>{
  setPostData({...postData , [event.target.name] : event.target.value})
 }
 
 useEffect(()=>{
 },[postData])
  return (
    <>
    <div className='bg-slate-100 md:mx-64 rounded-full'>
    <div className='bg-slate-100 mt-3 px-3 flex md:w-1/2 justify-center gap-3 md:mx-auto rounded-3xl'>
      <div className='pro_text mt-1 flex justify-center gap-3'>
        <img src='dummyProfile.png' alt='' className='rounded-full h-12 w-14 cursor-pointer' title='profile' />
        <input
          type='text'
          onChange={handleChange}
          name='caption'
          value={postData.caption}
          className='border-2 rounded-3xl text-gray-700 text-sm w-64 placeholder:text-gray-500 px-3'
          placeholder={`Whats on your mind, ${JSON.parse(localStorage.getItem('user')).name} ?`}
        />
      </div>

      <div className='pics'>
        <AiFillPicture className='text-5xl mt-1 cursor-pointer text-green-700' onClick={handlePictureClick} />
        <input
          type='file'
          ref={fileInputRef}
          style={{ display: 'none' }}
          onChange={handleFileChange}
          name='picture'
        />
      </div>
      </div>
      {
   selectedFile ?
   (<>
      <img src={selectedFile}  alt="" className='preview mt-1 md:w-96 md:h-auto mx-auto px-20'/>
      <p className=' mx-auto text-center cursor-pointer mt-1 hover:shadow-md bg-purple-900 text-white text-xl w-16 rounded-3xl ' onClick={handlePost}>Post</p>
  </> )
:
  <p className=' mx-auto text-center cursor-pointer mt-1 hover:shadow-md bg-purple-900 text-white text-xl w-16 rounded-3xl disabled' onClick={handlePost}>Post</p>
      }
    </div>
    <ToastContainer/>
    </>
  );
};

export default Mind;
