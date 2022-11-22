import React, { useContext } from 'react'
import Image from 'next/image'
import Logo from '../../assets/Logo.png'
import { useRouter } from "next/router";
import { XContext } from '../../context/XContext';
import NewCampaign from '../../container/newCampaign';
import InitAccount from './initAccount';

const Connected = () => {
    const { currentAccount, me } = useContext(XContext)
    const router = useRouter()

    return (
        <div className='w-full h-full flex'>
            <div className='px-[125px] flex w-full justify-between'>
                <div onClick={() => router.push('/')} className=' pt-[57px] hover:text-gray-500 cursor-pointer flex'>
                    <Image src={Logo} height={48.75} width={100} />
                </div>
                <div className='flex pt-[72px] font-noto text-[16px] text-white'>
                    <div onClick={() => router.push('/campaigns')} className='mr-[20px] hover:text-gray-500 cursor-pointer leading-[10px] '>CAMPAIGNS</div>
                    <div onClick={() => router.push('/host')} className='mr-[20px] hover:text-gray-500 cursor-pointer leading-[10px] '>HOSTS</div>
                    <div className='mr-[20px] hover:text-gray-500 cursor-pointer leading-[10px] '><NewCampaign /></div>
                    <div onClick={() => router.push('/community')} className='mr-[20px] hover:text-gray-500 cursor-pointer leading-[10px] '>COMMUNITY</div>
                </div>
                <div >
                {!me?.role ? (
                        <InitAccount />
                    ) : (
                        <div className='flex'>
                            <div onClick={() => router.push('/profile')} className='bg-[#A77300] hover:bg-gray-500 flex  px-3 font-noto cursor-pointer font-semibold  mt-[57px] w-[120px] h-[40px] text-center rounded-[10px]'>
                                <Image className='rounded-full p-4' src={`https://gateway.pinata.cloud/ipfs/${me?.profilePic}`} height={30} width={30} />
                                <div className='text-[12px] flex-1'>
                                    <div>{me?.name.slice(0, 6)}..</div>
                                    {currentAccount.slice(0, 6)}..
                                </div>
                            </div>
                            {/* <div title='Disconnect Wallet' className='text-[12px] mt-[65px] ml-4 cursor-pointer font-noto hover:text-red-700 text-gray-500 text-right underline'>Disconnect</div> */}
                        </div>
                    )}
                </div>
            </div>
        </div>
    )
}

export default Connected