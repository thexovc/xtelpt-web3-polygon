import Image from 'next/image'
import React from 'react'
import Error from '../assets/error.png'

const Mobile = () => {
  return (
    <div className='bg-[#252525] h-screen w-full'>
      <div className='grid place-items-center h-full w-full'>
        <div className='flex-1'>
          <div className='h-[450px] w-full flex flex-col justify-center items-center '>
            <Image src={Error} height={400} width={350} /></div>
          <div className='text-red-600 text-center text-2xl font-bungee '>Error</div>
          <div className='text-[#ACACAC] font-noto text-lg p-2 text-center'>Please switch to Desktop for Best Usage </div>
        </div>
      </div>
    </div>
  )
}

export default Mobile