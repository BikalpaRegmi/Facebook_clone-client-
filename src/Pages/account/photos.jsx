import React from 'react'

function Photos() {
  return (
    <>
    <h1 className='text-5xl ml-5 md:text-center font-serif text-purple-800'> Photos </h1>
    <div className='m-7 gap-3 grid grid-cols-2 md:grid-cols-3 '>
      <img src="dummyProfile.png" alt="" className='w-40 cursor-pointer md:w-96 md:h-96'/>
      <img src="dummyProfile.png" alt="" className='w-40 cursor-pointer md:w-96 md:h-96'/>
      <img src="dummyProfile.png" alt="" className='w-40 cursor-pointer md:w-96 md:h-96'/>
    </div>
    </>
  )
}

export default Photos
