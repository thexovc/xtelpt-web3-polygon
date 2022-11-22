import React, { useContext, useEffect, useState } from 'react'
import Image from 'next/image'
import Ellipse from '../../assets/Ellipse 2.png'
import { useRouter } from 'next/router'
import { XContext } from '../../context/XContext';


const Profile = () => {
  const { currentAccount, me } = useContext(XContext)
  const router = useRouter()


  return (
    <div className='grid place-items-center h-screen w-full'>
      <div className='flex justify-center mb-10 w-full '>
        <div className='bg-[#2D1300] w-1/3 h-90 shadow-[0_6px_10px_4px_rgba(0,0,0,0.5)] rounded-[30px] '>
          <div className='grid place-items-center mt-6 w-full'>
            <Image src={`https://gateway.pinata.cloud/ipfs/${me?.profilePic}`} height={150} width={150} className="rounded-full" />
            <div className='font-bungee text-[24px] mt-2 text-white'>{me?.name}</div>
            <div className='font-noto font-semibold text-[#FFFFFF] leading-[14px]  text-[16px]'>{currentAccount.slice(0, 9)}...</div>
            <div className='flex font-noto font-semibold mt-[10px] ] text-[24px]'>
              <div className='text-green-400'>{me?.role}</div>
              <div className='w-5 pl-2 h-5 -mt-1'>
                <Image src={Ellipse} height={5} width={5} />
              </div>
              {me?.role == "Host" && (
                <div className='text-white text-10'>{me?.hostTitle}</div>
              )}

            </div>
            <div className='font-noto text-12 mt-1 text-[#817C7C]'>{me?.bio}</div>
            <div className='flex items-center w-full justify-center mt-[8px]'>
              {me?.role == "Host" && (
                <div onClick={() => router.push('/schedule')} className='flex cursor-pointer font-noto rounded-[10px] h-15 w-50 text-center font-medium mb-5 bg-[#A77300] mt-[10px] p-2'>
                  <div className=' justify-center cursor-pointer text-white text-15'>Add Schedule</div>
                </div>
              )}

            </div>

          </div>

        </div>

      </div>
    </div>
  )
}

export default Profile