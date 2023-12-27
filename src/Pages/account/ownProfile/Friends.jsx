import React from 'react'

const Friends = () => {
  return (
    <div>
          <h1 className='text-5xl ml-5 md:text-center font-serif text-purple-800 mt-7'> Followers </h1>
     
     <div className="friends grid my-7 grid-cols-2 md:grid-cols-4 md:ml-9 mx-1">

        <div className="container flex gap-3">
        <img src="dummyProfile.png" alt=""  className='w-14 h-14 mt-1 rounded-full'/>
        <p className='self-center  md:text-lg'> Bikalpa Regmi</p>
        </div>
        <div className="container flex gap-3">
        <img src="dummyProfile.png" alt=""  className='w-14 h-14 mt-1 rounded-full'/>
        <p className='self-center  md:text-lg'> Bikalpa Regmi</p>
        </div>
        <div className="container flex gap-3">
        <img src="dummyProfile.png" alt=""  className='w-14 h-14 mt-1 rounded-full'/>
        <p className='self-center  md:text-lg'> Bikalpa Regmi</p>
        </div>
        <div className="container flex gap-3">
        <img src="dummyProfile.png" alt=""  className='w-14 h-14 mt-1 rounded-full'/>
        <p className='self-center  md:text-lg'> Bikalpa Regmi</p>
        </div>

     </div>

    </div>
  )
}

export default Friends
