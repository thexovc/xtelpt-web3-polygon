import React, { useContext, useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import { XContext } from '../../context/XContext';
import { ethers } from 'ethers'

const NewNotification = () => {
  const router = useRouter()

  const { xtelptAddress, abi, me, currentAccount } = useContext(XContext)

  const [meeting, setMeeting] = useState()
  const [campaign, setCampaign] = useState()
  const [hostMeeting, setHostMeeting] = useState()
  const [hostCampaign, setHostCampaign] = useState()

  const updateUIValues = async () => {
    const provider = new ethers.providers.Web3Provider(window.ethereum)
    const xtelptContract = new ethers.Contract(xtelptAddress, abi, provider)

    const allMeeting = await xtelptContract.getAllAccount()

    let arr = []
    let arr2 = []

    for (let i = 0; i < allMeeting.length; i++) {
      let prof = await xtelptContract.getMeeting(allMeeting[i])

      for (let j = 0; j < prof.length; j++) {
        if (prof[j].user.toLowerCase() == currentAccount.toLowerCase()) {
          arr.push(prof[j])
          // console.log(arr)
        }
      }
    }

    if (arr.length > 0) {
      setMeeting(arr)
    }

    const allCampaign = await xtelptContract.getCampaign()
    for (let i = 0; i < allCampaign.length; i++) {
      if (allCampaign[i].user.toLowerCase() == currentAccount.toLowerCase()) {
        arr2.push(allCampaign[i])
        // console.log(arr2)
      }
    }

    if (arr2.length > 0) {
      setCampaign(arr2)
    }


  }

  const updateUIHostValues = async () => {
    const provider = new ethers.providers.Web3Provider(window.ethereum)
    const xtelptContract = new ethers.Contract(xtelptAddress, abi, provider)

    const allMeeting = await xtelptContract.getAllAccount()

    let arr = []
    let arr2 = []

    for (let i = 0; i < allMeeting.length; i++) {
      let prof = await xtelptContract.getMeeting(allMeeting[i])

      for (let j = 0; j < prof.length; j++) {
        if (prof[j].host.toLowerCase() == currentAccount.toLowerCase()) {
          arr.push(prof[j])
          console.log(arr)
        }
      }
    }

    if (arr.length > 0) {
      setHostMeeting(arr)
    }

    const allCampaign = await xtelptContract.getCampaign()
    for (let i = 0; i < allCampaign.length; i++) {
      if (allCampaign[i].vol.toLowerCase() == currentAccount.toLowerCase()) {
        arr2.push(allCampaign[i])
        console.log(arr2)
      }
    }

    if (arr2.length > 0) {
      setHostCampaign(arr2)
    }


  }



  useEffect(() => {
    setTimeout(() => {
      updateUIValues()

    }, 1000);
  }, [])
  useEffect(() => {
    setTimeout(() => {
      updateUIHostValues()

    }, 1000);
  }, [])


  return (
    <div className='m-4'>
      <div className=' flex-1 text-center w-full '>
        <div className='h-full text-white flex-1 w-full'>
          {me?.role == "User" &&

            (
              <>
                {meeting?.map((item) => (
                  <div className='bg-[#D9D9D933] py-2 h-[40px] w-[296px] text-left flex pl-2 mt-[12px]'>Hey! Your meeting starts in 15mins</div>
                ))}

                {campaign?.map((item) => (
                  <div className='bg-[#D9D9D933] py-2 h-[40px] w-[296px] mt-[12px] pl-2 flex justify-between'>It’s time join call now
                    <div onClick={() => router.push('/call/currentAccount')} className='bg-[#6BE42B] w-[56px] py-[5px] text-[12px] mr-2 rounded-[7px] h-[28px]'>Join</div>
                  </div>
                ))}

              </>
            )
          }

          {me?.role == "Host" &&

            (
              <>
                {hostMeeting?.map((item) => (
                  <div className='bg-[#D9D9D933] py-2 h-[40px] w-[296px] text-left flex pl-2 mt-[12px]'>Hey! Your meeting starts in 15mins</div>
                ))}

                {hostCampaign?.map((item) => (
                  <div className='bg-[#D9D9D933] py-2 h-[40px] w-[296px] mt-[12px] pl-2 flex justify-between'>It’s time join call now
                    <div onClick={() => router.push('/call/currentAccount')} className='bg-[#6BE42B] w-[56px] py-[5px] text-[12px] mr-2 rounded-[7px] h-[28px]'>Join</div>
                  </div>
                ))}

              </>
            )
          }

        </div>
      </div>
    </div >
  )
}

export default NewNotification