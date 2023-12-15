import React from 'react'
import { RiTwitterXLine } from "react-icons/ri";
import { FaFacebookF } from "react-icons/fa6";
import { FaYoutube } from "react-icons/fa";
import { FaLinkedin } from "react-icons/fa";
import Logo from './navigation/Logo';

const Footer = () => {
  return (
    <div>
      <div className="footer bg-blue-50 text-purple-700 mt-40 py-3 pb-16 flex flex-col">

        <div className="head">
        <Logo/>
        
        <h1 className='text-3xl text-center font-bold mt-1'>Follow me on</h1>
        </div>

        <div className="icons flex justify-around text-purple-900 mt-7 text-xl">
         <a href="https://www.facebook.com/profile.php?id=100081528401982" target='blank'><FaFacebookF/></a> 
          <a href="https://media.gq-magazine.co.uk/photos/5d138f9a976fa33a13f3946f/1:1/w_1280,h_1280,c_limit/twitter-gq-24jul18_b.jpg" target='blank'><RiTwitterXLine/></a> 
          <a href="https://www.linkedin.com/in/bikalpa-regmi-381544294/" target='blank'><FaLinkedin/></a> 
          <a href="https://www.youtube.com/channel/UC42Vm0ulLLHRyQlcoqC-NzQ" target='blank'><FaYoutube/></a> 
        </div>
        <p className='text-right pr-9 mt-7 font-mono self-end justify-self-end'>By Bikalpa Regmi</p>
      </div>
    </div>
  )
}

export default Footer
