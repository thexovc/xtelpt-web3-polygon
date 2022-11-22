import React, { useContext, useEffect, useState } from 'react'
import Image from 'next/image'
import Ellipse from '../../assets/Ellipse 2.png'
import { useRouter } from 'next/router'
import { XContext } from '../../context/XContext';
import { ethers } from 'ethers';


const Profile = () => {
  const router = useRouter()
  const hostAccount = router.query.addr
  const [host, setHost] = useState()
  const { xtelptAddress, abi, me } = useContext(XContext)



  const updateUIValues = async () => {
    const provider = new ethers.providers.Web3Provider(window.ethereum)
    const xtelptContract = new ethers.Contract(xtelptAddress, abi, provider)

    try {

      if (hostAccount) {
        let prof = await xtelptContract.getProfile(router.query.addr)
        setHost(prof)
      }

    } catch (err) {
      console.log("an error occured")
    }

  }

  useEffect(() => {
    setTimeout(() => {
      updateUIValues()
    }, 300);
  }, [hostAccount])



  return (
    <div className='bg-hero bg-no-repeat bg-right grid place-items-center h-screen w-full'>
      <div className='flex justify-center mb-10 w-full '>
        <div className='bg-[#2D1300] w-1/3 h-90 shadow-[0_6px_10px_4px_rgba(0,0,0,0.5)] rounded-[30px] '>
          <div className='grid place-items-center mt-6 w-full'>
            <Image src={`https://gateway.pinata.cloud/ipfs/${host?.profilePic}`} height={150} width={150} className="rounded-full" />
            <div className='font-bungee text-[24px] mt-2 text-white'>{host?.name}</div>
            <div className='font-noto font-semibold text-[#FFFFFF] leading-[14px]  text-[16px]'>{hostAccount?.slice(0, 9)}...</div>
            <div className='flex font-noto font-semibold mt-[10px] ] text-[24px]'>
              <div className='text-green-400'>{host?.role}</div>
              <div className='w-5 pl-2 h-5 -mt-1'>
                <Image src={Ellipse} height={5} width={5} />
              </div>
              {host?.role == "Host" && (
                <div className='text-white text-10'>{host?.hostTitle}</div>
              )}
            </div>
            <div className='font-noto text-12 mt-1 text-[#817C7C]'>{host?.bio}</div>
            <div className='flex items-center w-full justify-center mt-[8px] cursor-pointer'>

              <div
                onClick={() => router.push({
                  pathname: '/viewSchedule',
                  query: { addr: hostAccount },
                })} className='flex cursor-pointer font-noto rounded-[10px] h-15 w-50 text-center font-medium mb-5 bg-[#A77300] mt-[10px] p-2'>
                <div className=' justify-center cursor-pointer text-white text-15'>Check Schedule</div>
              </div>


            </div>

          </div>

        </div>

      </div>
    </div>
  )
}

export default Profile