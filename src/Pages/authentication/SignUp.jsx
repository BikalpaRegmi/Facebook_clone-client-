import React from 'react'
import Logo from '../../components/navigation/Logo'
import { Link } from 'react-router-dom'

const SignUp = () => {
  return (
    <div>
    <div className="logo flex justify-center mt-9 pb-3">
    <Logo/>
    </div>

    <div className="box mx-auto px-3 capitalize flex justify-center flex-col mt-20 md:w-1/2 shadow-lg py-3 md:px-3 text-3xl">
 <h1 className='text-center mx-auto mb-9 text-5xl mt-9 font-mono w-64 shadow-md shadow-purple-700'>SignUp</h1>
     <p className='md:flex sm:text-3xl justify-between my-3 font-bold'>  name : <input type='text' className='border-2 font-light capitalize pl-1 text-xl md:w-1/2 w-10/12'/> </p>
     <p className='md:flex sm:text-3xl justify-between my-3 font-bold'>  PhoneNo : <input type='number' className='border-2 font-light capitalize pl-1 text-xl md:w-1/2 w-10/12'/> </p>
     <p className='md:flex sm:text-3xl justify-between my-3 font-bold'>  email : <input type='text' className='border-2 md:w-1/2 font-light capitalize pl-1 text-xl w-10/12'/> </p>
     <p className='md:flex sm:text-3xl justify-between my-3 font-bold'>  password : <input type='password' className='border-2 font-light capitalize pl-1 text-xl md:w-1/2 w-10/12'/> </p>
     <p className='md:flex sm:text-3xl justify-between my-3 font-bold'>  confirm password : <input type='password' className='border-2 font-light capitalize pl-1 text-xl md:w-1/2 w-10/12'/> </p> 
     <p className='text-3xl my-3 border-2 w-10/12 text-center cursor-pointer py-1 mt-7 hover:bg-purple-950 bg-purple-900 text-white rounded-3xl' title='submit'>create an account</p> <br />
    </div>
    <p className='text-center mt-3'>Already have an account ?</p>
    <Link to={'/signIn'}>
    <p className='text-3xl mx-auto my-3 border-2 w-96 text-center cursor-pointer py-1 mt-3 hover:bg-purple-950 bg-purple-900 text-white rounded-3xl mb-32' title='submit'>Login</p> <br />

    </Link>

    </div>
  )
}

export default SignUp
