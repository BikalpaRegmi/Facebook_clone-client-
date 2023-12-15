import React, { useState } from 'react'
import { FiEye,FiEyeOff } from "react-icons/fi";
import Logo from '../../components/navigation/Logo';
import { Link, useNavigate } from 'react-router-dom';
import axios from '../../../axiosConfig'
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const SignIn = () => {
  const [eye,setEye] = useState(false)
  const [userInput,setUserInput] = useState({
    email:'',
    password:'',
  })
 const navigate = useNavigate()
  const handleEye = () =>{
    if(eye){
      setEye(false)
    }else{
      setEye(true)
    }
  }

  const handleChange = (event)=>{
    setUserInput({...userInput , [event.target.name] : event.target.value})
  }

  const login = async(event)=>{
    event.preventDefault()
    try {
      const res = await axios.post('/api/users/signin' , userInput);
   
      if(userInput.email ==='' || userInput.password==='') toast.warn('Every field shall be filled')
   
      else if(res.data.error === 'email not found plz register') toast.error(res.data.error)
   
      else if(res.data.error ==='Password didnt matched') toast.error(res.data.error)
   
      else{
       toast.success('signIn sucessful')
       setTimeout(() => {
        navigate('/')
        window.location.reload()
        console.log('Sign-in  success');
      }, 3000);
      }

    } catch (error) {
      console.log(error)
    }
  }
  return (
    <div className=''>
     <div className="logo flex justify-center mt-9 pb-3">
    <Logo/>
    </div>

    <div className="box mx-auto px-3 capitalize flex justify-center flex-col mt-20 md:w-1/2 shadow-lg py-3 md:px-3 text-3xl">
    <h1 className='text-center mx-auto mb-9 text-5xl mt-9 font-mono w-64 shadow-md shadow-purple-700'>signIn</h1>
    <p className='md:flex flex-col sm:text-3xl justify-between my-3 font-bold'>  email : <input type='text' value={userInput.email} onChange={handleChange} name='email' className='border-2 font-light capitalize pl-1 text-xl md:w-1/2 w-10/12'/> </p>
    <p className='md:flex flex-col sm:text-3xl justify-between my-3 font-bold'>  password :
     {  eye ? 
     <span className='flex gap-3'>   <input type='text' onChange={handleChange} value={userInput.password} name='password' className='border-2 font-light capitalize pl-1 text-xl md:w-1/2 w-10/12'/>
      <p onClick={handleEye}><FiEye className='cursor-pointer'/></p> 
     </span> 
     : 
     <span className='flex gap-3'>   <input type='password' onChange={handleChange} value={userInput.password} name='password' className='border-2 font-light capitalize pl-1 text-xl md:w-1/2 w-10/12'/>
      <p onClick={handleEye}><FiEyeOff className='cursor-pointer'/></p> 
     </span> 
     }
    
      </p>

    <p className='text-5xl my-3 border-2 w-52 text-center cursor-pointer py-2 mt-3 hover:bg-purple-950 bg-purple-900 text-white rounded-3xl' onClick={login} title='submit'>Login</p> <br />

</div>
<p className='text-center mt-3'>New to Bi Book ?</p>

<Link to={'/signUp'}>
    <p className='text-3xl mx-auto my-3 border-2 w-96 text-center cursor-pointer py-1 mt-3 hover:bg-purple-950 bg-purple-900 text-white rounded-3xl mb-32' title='submit'>Create an account</p> <br />
</Link>
<ToastContainer/>
    </div>
  )
}

export default SignIn
