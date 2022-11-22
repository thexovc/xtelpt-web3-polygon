import React, { useContext } from 'react'
import Image from 'next/image'
import Logo from '../../assets/Logo.png'
import Notification from '../../container/notification';
import { useRouter } from "next/router";
import { XContext } from '../../context/XContext';



const Notconnected = () => {
  const { connectWallet, appStatus, currentAccount } = useContext(XContext)
    const router = useRouter()
  return (
    <div className='w-full h-full flex'>
    <div className='px-[125px] flex w-full justify-between'>
    <div onClick={() => router.push('/')} className=' pt-[57px] cursor-pointer flex'>
        <Image src={Logo} height={48.75} width={100} />
     </div>
        <div className='flex pt-[72px] font-noto text-[16px] text-white'>
            <div onClick={() => router.push('/campaigns')} className='mr-[20px] hover:text-gray-500 cursor-pointer leading-[10px] '>CAMPAIGNS</div>
            <div onClick={() => router.push('/host')} className='mr-[20px] hover:text-gray-500 cursor-pointer leading-[10px] '>HOSTS</div>
            <div onClick={() => router.push('#')} className='mr-[20px] hover:text-gray-500 cursor-pointer leading-[10px] '>NOTIFICATION</div>
            <div onClick={() => router.push('/community')} className='mr-[20px] hover:text-gray-500 cursor-pointer leading-[10px] '>COMMUNITY</div>
        </div> 
        <div >
        <div onClick={() => connectWallet()} className='bg-[#A77300] hover:bg-gray-500 text-[12px] font-noto cursor-pointer font-semibold py-3 mt-[57px] w-[120px] h-[40px] text-center rounded-[10px]'>CONNECT WALLET</div>
    </div>
    </div>
</div>
  )
}

export default Notconnected