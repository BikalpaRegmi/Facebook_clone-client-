import React, { useLayoutEffect } from 'react'
import './App.css'
import Nav from './components/navigation/mainNav'
import MblNav from './components/navigation/mblNav'
import {Routes , Route, useLocation} from 'react-router-dom';
import Home from './Pages/home';
import SignIn from './Pages/authentication/SignIn'
import SignUp from './Pages/authentication/SignUp'
import Friends from './Pages/friends/index'
import Notify from './Pages/Notifications/index';
import Account from './Pages/account/ownProfile';
import Message from './Pages/messages';
import Footer from './components/footer';
import OtherPro from './Pages/account/otherProfile';



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
     <Route path='/friends' Component={Friends}/>
     <Route path='/notifications' Component={Notify}/>
     <Route path='/myprofile' Component={Account}/>
     <Route path='/msg' Component={Message}/>
     <Route path='/profile/:id' Component={OtherPro}/>
     
        </Routes>


      <Footer/>
      <MblNav/>
    </div>
  )
}

export default App
