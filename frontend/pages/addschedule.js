import React, { useContext, useState } from 'react'
import { useRouter } from 'next/router'
import { XContext } from '../context/XContext';
import { ethers, utils } from 'ethers';
import Loader from '../container/loader'

const Addschedule = () => {
  const { xtelptAddress, abi, currentAccount } = useContext(XContext)
  const [datetime, setDatetime] = useState()

  const router = useRouter()

  const [desc, setDesc] = useState("")
  const [dura, setDura] = useState()
  const [price, setPrice] = useState(0)
  const [loading, setLoading] = useState(false)
  const [close, setClose] = useState(false)



  const handleCreate = async () => {
    setLoading(true)

    const fee = utils.parseEther(price)
    console.log("fee", fee)

    const date = +new Date(datetime)
    console.log(date)

    const start = Math.round(date / 1000)

    const dur = +new Date(dura)
    console.log(dur)

    const end = Math.round(dur / 1000)

    // const intr = Math.abs((start - end) / 60);

    // console.log(intr)

    console.log("started")
    const provider = new ethers.providers.Web3Provider(window.ethereum)
    const signer = provider.getSigner();
    const xtelptContract = new ethers.Contract(xtelptAddress, abi, signer)

    try {
      const createSchedule = await xtelptContract.createSchedule(start, end, fee, desc)
      setClose(true)

    } catch (error) {
      setLoading(false)
      console.log(error)
      return
    }

    router.push({
      pathname: '/viewSchedule',
      query: { addr: currentAccount },
    })

  }


  return (
    <div className='bg-[#252525] w-full'>
      <div className='bg-hero bg-right w-full bg-no-repeat flex h-screen '>
        <div className='sticky-not w-full'>
          <div id="alert-1" class={`flex ${!close && "hidden"} p-4 mb-4 bg-blue-100 rounded-lg dark:bg-blue-200`} role="alert">
            <svg aria-hidden="true" class="flex-shrink-0 w-5 h-5 text-blue-700 dark:text-blue-800" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clip-rule="evenodd"></path></svg>
            <span class="sr-only">Info</span>
            <div class="ml-3 text-sm font-medium text-blue-700 dark:text-blue-800">
              An activity has been added to your Notification
            </div>
            <button type="button" onClick={() => setClose(false)} class="ml-auto -mx-1.5 -my-1.5 bg-blue-100 text-blue-500 rounded-lg focus:ring-2 focus:ring-blue-400 p-1.5 hover:bg-blue-200 inline-flex h-8 w-8 dark:bg-blue-200 dark:text-blue-600 dark:hover:bg-blue-300" data-dismiss-target="#alert-1" aria-label="Close">
              <span class="sr-only">Close</span>
              <svg aria-hidden="true" class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clip-rule="evenodd"></path></svg>
            </button>
          </div>
        </div>
        <div className=' flex-1'>
          <div className='text-[32px] justify-center mt-32 flex font-noto text-green-400 font-semibold'>Set Availability time.</div>

          <div className='flex justify-center mt-10 h-12 pr-12 font-bold text-white'> <p className='pr-4 mt-2'> Date & Time: </p>
            <div className='w-60 h-12 rounded-[12px] border-4  text-black flex bg-blue-200 self-center' >
              <input className='outline-none bg-transparent' onChange={(e) => setDatetime(e.target.value)} type="datetime-local" id="Test_timeLocal" />
            </div></div>

          <div className='flex justify-center mt-10 h-12 pr-12 font-bold text-white'> <p className='pr-4 mt-2'> End Date/Time </p>
            <div className='w-60 h-12 rounded-[12px] border-4  text-black flex bg-blue-200 self-center ' >
              <input className=' outline-none bg-transparent' onChange={(e) => setDura(e.target.value)} id="Test_timeLocal" type="datetime-local" title='write a duration in hh:mm:ss' /> </div>
          </div>
          <div className='flex justify-center mt-10 h-12 pr-16 font-bold text-white'> <p className='pr-4 mt-2'> Session Fee </p>
            <div className='w-60 h-12 rounded-[12px] border-4  text-black flex pl-2 self-center ' >
              <input className=' outline-none bg-transparent text-white' onChange={(e) => setPrice(e.target.value)} id="price" placeholder='Matic' type="number" title='Price in Matic' /> </div>
          </div>

          <div className='pl-2 flex justify-center' >
            <input onChange={(e) => setDesc(e.target.value)} maxLength="130" type="text" className='w-[426px] h-[50px] bg-transparent mt-10 text-white rounded-[12px] border-2 pl-2' placeholder='Description' /></div>

          {loading ? (
            <div className='pr-64 flex justify-center' onClick={handleCreate} title='Multiple schedule can be created' >
              <p className='font-noto bg-[#755204] cursor-pointer text-[14px] mt-10 h-[41px] rounded-[12px] pt-2.5 pl-3 w-[150px] text-white' >
                Loading ...
              </p>
            </div>
          ) : (
            <div className='pr-64 flex justify-center' onClick={handleCreate} title='Multiple schedule can be created' >
              <p className='font-noto bg-[#755204] cursor-pointer text-[14px] mt-10 h-[41px] hover:bg-gray-700 rounded-[12px] pt-2.5 pl-3 w-[150px] text-white' > Create Schedule </p>
            </div>
          )}


          <div onClick={() => router.push({
            pathname: '/viewSchedule',
            query: { addr: currentAccount },
          })} className='flex justify-center cursor-pointer pl-72 text-red-600' title='Check created schedule'> <u>Checkschedule</u> </div>
        </div>
      </div>
    </div >



  )
}

export default Addschedule