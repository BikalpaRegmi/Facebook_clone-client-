import React, { useRef, useState } from 'react';
import { AiFillPicture } from 'react-icons/ai';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Mind = () => {
  const fileInputRef = useRef(null);
  const [selectedFile, setSelectedFile] = useState(null);
  const [caption , setCaption] = useState('')

  const handlePictureClick = () => {
    fileInputRef.current.click();
  };

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile) {
      const blobUrl = URL.createObjectURL(selectedFile);
      setSelectedFile(blobUrl);
    }
  };

 
 const handlePost = ()=>{
  if(!selectedFile && !caption){
    toast.error('plz select a picture or write some text before posting')
  }
  else if(caption.length < 9){
    toast.error('caption must be atleast 10 letters')
  }
 }
  return (
    <>
    <div className='bg-slate-100 md:mx-64 rounded-full'>
    <div className='bg-slate-100 mt-3 px-3 flex md:w-1/2 justify-center gap-3 md:mx-auto rounded-3xl'>
      <div className='pro_text flex justify-center gap-3'>
        <img src='dummyProfile.png' alt='' className='rounded-full w-14 cursor-pointer' title='profile' />
        <input
          type='text'
          onChange={(e)=>setCaption(e.target.value)}
          value={caption}
          className='border-2 rounded-3xl text-gray-700 w-64 placeholder:text-gray-500 px-3'
          placeholder={`Whats on your mind, Ram ?`}
        />
      </div>

      <div className='pics'>
        <AiFillPicture className='text-5xl mt-1 cursor-pointer text-green-700' onClick={handlePictureClick} />
        <input
          type='file'
          ref={fileInputRef}
          style={{ display: 'none' }}
          onChange={handleFileChange}
        />
      </div>
      </div>
      {
   selectedFile ?
   (<>
      <img src={selectedFile}  alt="" className='preview mt-1 md:w-96 h-64 md:h-auto mx-auto px-20'/>
      <p className=' mx-auto text-center cursor-pointer mt-1 hover:shadow-md bg-purple-900 text-white text-xl w-16 rounded-3xl '>Post</p>
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
