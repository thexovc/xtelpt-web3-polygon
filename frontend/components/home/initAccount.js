import React, { useContext } from 'react'
import Image from 'next/image'
import ProfileP from '../../assets/profle-p.png'
import Logo from '../../assets/Logo.png'
import Notification from '../../container/notification';
import { useRouter } from "next/router";
import { XContext } from '../../context/XContext';

const InitAccount = () => {
    const { currentAccount, me } = useContext(XContext)
    const router = useRouter()
  return (
    <div onClick={() => router.push('/auth')} className='bg-[#A77300] flex hover:bg-gray-500 px-3 py-2 font-noto cursor-pointer font-semibold  mt-[57px] w-[120px] h-[40px] text-center rounded-[10px]'>
    Initialize</div>
  )
}

export default InitAccount