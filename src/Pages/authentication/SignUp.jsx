import React, { useState } from 'react'
import Logo from '../../components/navigation/Logo'
import { Link, useNavigate } from 'react-router-dom'
import { FaEye ,FaEyeSlash} from "react-icons/fa";
import axios from '../../../axiosConfig';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const SignUp = () => {
  const[eye,setEye] = useState(true);
  const[icon,setIcon] = useState(<FaEyeSlash/>)
  const [type,setType] = useState('password')
const [userInput , setUserInput] = useState({
  name:'',
  phone:'98',
  email:'',
  password:'',
  conPassword:''
})
const navigate = useNavigate()

const toggleEye = ()=>{
  if(eye === true){
   setIcon(<FaEye className='cursor-pointer'/>)
   setType('text')
   setEye(false)
  }
  else{
   setIcon(<FaEyeSlash className='cursor-pointer'/>)
   setType('password')
   setEye(true)
  }
  }

const handleChange = (event)=>{
   setUserInput({...userInput , [event.target.name] : event.target.value})
}

const register = async(event) =>{
event.preventDefault();
try {
  const response = await axios.post('/api/users/register' , userInput);
  if(response.data.error === 'email already exists') toast.error(response.data.error)

  else if(userInput.name=='' || userInput.phone=='' || userInput.email=='' || userInput.password=='' || userInput.conPassword==''){
    toast.warn('oops! a field is empty')
  }

  else if (response.data.error === `password didn't matched`) toast.error(response.data.error)

  else if (userInput.password.length < 3) toast.error('password must be atleast 3 character ')

  else if (response.data.name ==='ValidationError') toast.error('invalid email')

  else {
    toast.success('Registeration sucessfull now login');
    setTimeout(() => {
      navigate('/signin')
    }, 3000);
  }

} catch (error) {
  console.log(error)
}
}
  return (
    <div className='bg-gradient-to-b from-gray-50 to-gray-100'>
    <div className="logo flex justify-center mt-3 pb-3">
    <Logo/>
    </div>
    <div className="box mx-auto px-3 capitalize flex justify-center flex-col mt-20 md:w-1/2 shadow-lg py-3 md:px-3 text-3xl">
 <h1 className='text-center mx-auto mb-9 text-5xl mt-9 font-mono w-64 shadow-md shadow-purple-700'>SignUp</h1>
     <p className='md:flex sm:text-3xl justify-between my-3 font-bold'>  name : <input type='text' name='name' onChange={handleChange} className='border-2 font-light capitalize pl-1 text-xl md:w-1/2 w-10/12'/> </p>
     <p className='md:flex sm:text-3xl justify-between my-3 font-bold'>  PhoneNo : <input type='number' value={userInput.phone} name='phone' onChange={handleChange} className='border-2 font-light capitalize pl-1 text-xl md:w-1/2 w-10/12'/> </p>
     <p className='md:flex sm:text-3xl justify-between my-3 font-bold'>  email : <input type='text' name='email' onChange={handleChange} className='border-2 md:w-1/2 font-light capitalize pl-1 text-xl w-10/12'/> </p>
     <p className=' sm:text-3xl justify-between my-3 font-bold'>  password :<span className='flex gap-9'> <input type={type} name='password' onChange={handleChange} className='border-2 font-light capitalize pl-1 text-xl md:w-1/2 w-10/12'/> <span className='cursor-pointer' onClick={toggleEye}>{icon}</span> </span> </p>
     <p className=' sm:text-3xl justify-between my-3 font-bold'>  confirm password : <span className='flex gap-9'><input type={type} name='conPassword' onChange={handleChange} className='border-2 font-light capitalize pl-1 text-xl md:w-1/2 w-10/12'/> <span className='cursor-pointer' onClick={toggleEye}>{icon}</span>  </span></p> 
     <p className='text-3xl my-3 border-2 w-10/12 text-center cursor-pointer py-1 mt-7 hover:bg-purple-950 bg-purple-900 text-white rounded-3xl' title='submit' onClick={register}>register</p> <br />
    </div>
    <p className='text-center mt-3'>Already have an account ?</p>
    <Link to={'/signIn'}>
    <p className='text-xl underline mx-auto my-3 text-purple-700 w-96 text-center cursor-pointer  hover:text-purple-950  rounded-3xl mb-32' title='submit'>Login</p> <br />
    </Link>
    <ToastContainer/>
    </div>
  )
}

export default SignUp
