import React from 'react'
import { BiLike } from 'react-icons/bi'
import { BsThreeDots } from 'react-icons/bs'
import { FaRegComment, FaShare } from 'react-icons/fa6'

const Posts = () => {
  return (
    <div>
    <h1 className='text-5xl ml-5 md:text-center font-serif text-purple-800'> Posts</h1>
       <div className="wrapper bg-slate-50 md:w-[777px] px-7 mx-auto mt-7 rounded-3xl">

<div className="head flex justify-between pt-1 ">

<span className="profile flex gap-3 ">

  <img src="dummyProfile.png" alt="" className='rounded-full w-12 cursor-pointer' title='profile'/>
  <p className='flex flex-col'>Bikki Chikki Dhikki <i className='text-sm font-light'>3 days ago</i></p>
</span>

<span className="menu mt-3 ">
<BsThreeDots className='text-xl cursor-pointer hover:text-purple-700' title='menu'/>
</span>

</div>

<div className="image mt-5 md:px-9">
<p className='mb-1'>Hii i just clicked a picture cuz i was feeling boring</p>

<img src="dummyPostImg.png" alt="" className='mx-auto h-56 md:h-96 w-full'/>
</div>

<div className="bottom flex border-t-2 justify-between text-3xl md:px-14 px-3 mt-3">
<span className="like flex text-lg gap-1 cursor-pointer hover:text-purple-900"><BiLike className='mt-1 text-black text-3xl cursor-pointer' title='like'/>(40) </span>
{/* <span className="like flex text-lg gap-1 cursor-pointer"><BiLike className='mt-1 text-purple-700 text-3xl cursor-pointer' title='like'/> <p className='mt-2 text-purple-700'>Liked (40)</p></span> */}
<span className="comment flex text-lg gap-1 hover:text-purple-900"><FaRegComment className='mt-1 text-3xl cursor-pointer' title='comments'/>(9)</span>
<span className="share flex text-lg gap-1 hover:text-purple-900"><FaShare className='mt-1 text-3xl cursor-pointer' title='share'/>(7)</span>
</div>
</div>
    </div>
  )
}

export default Posts
