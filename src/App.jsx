import React, { useLayoutEffect } from 'react'
import './App.css'
import Nav from './components/navigation/mainNav'
import MblNav from './components/navigation/mblNav'
import {Routes , Route, useLocation} from 'react-router-dom';
import Home from './Pages/home';
import SignIn from './Pages/authentication/SignIn'
import SignUp from './Pages/authentication/SignUp'
const App = () => {
  const {pathname} = useLocation();

useLayoutEffect(()=>{
  window.scrollTo({top:1 , behavior:'smooth'})
},[pathname])
  return (
    
    <div>
      <Nav/>



        <Routes>

     <Route path='/' Component={Home}/>
     <Route path='/signIn' Component={SignIn}/>
     <Route path='/signUp' Component={SignUp}/>
     <Route path='/friends' Component={SignUp}/>
     <Route path='/notifications' Component={SignUp}/>
     <Route path='/profile' Component={SignUp}/>
     
        </Routes>



      <MblNav/>
    </div>
  )
}

export default App
