import React, { useContext, useEffect, useState } from 'react'
import moment from "moment"
import { useRouter } from 'next/router'
import { XContext } from '../context/XContext';
import { ethers, utils } from 'ethers'

const Checkschedule = () => {
  const router = useRouter()
  const hostAccount = router.query.addr


  const { xtelptAddress, abi, me } = useContext(XContext)

  const [meeting, setMeeting] = useState()
  const [loading, setLoading] = useState(false)
  const [close, setClose] = useState(false)
  const [close2, setClose2] = useState(false)

  const updateUIValues = async () => {
    const provider = new ethers.providers.Web3Provider(window.ethereum)
    const xtelptContract = new ethers.Contract(xtelptAddress, abi, provider)

    // const allMeeting = await xtelptContract.getAllAccount()
    // console.log(allMeeting)

    let arr = []

    const acct = router.query.addr
    if (acct) {
      let prof = await xtelptContract.getMeeting(acct)
      console.log("Prf", prof)

      if (!prof.completed) {
        arr.push(prof)
      }
    }





    if (arr.length > 0) {
      setMeeting(arr)
    }

    console.log(meeting)

  }

  const handleCreate = async (host, id, fee) => {
    setLoading(true)
    console.log("started")
    const provider = new ethers.providers.Web3Provider(window.ethereum)
    const signer = provider.getSigner();
    const xtelptContract = new ethers.Contract(xtelptAddress, abi, signer)

    try {
      const joinMeeting = await xtelptContract.joinMeeting(host, id, { value: fee, gasLimit: 5000000 })
      setClose(true)



      // router.push({
      //   pathname: '/hostprofile',
      //   query: { addr: hostAccount },
      // })
    } catch (error) {
      setClose2(true)
      setLoading(false)
      console.log(error)
    }

  }

  useEffect(() => {
    setTimeout(() => {
      updateUIValues()
    }, 1000);
  }, [hostAccount])

  return (

    <div className='w-full h-vh bg-hero bg-right bg-no-repeat flex-1'>
      <div className='sticky-not w-full'>
        <div id="alert-1" className={`flex ${!close && "hidden"} p-4 mb-4 bg-blue-100 rounded-lg dark:bg-blue-200`} role="alert">
          <svg aria-hidden="true" className="flex-shrink-0 w-5 h-5 text-blue-700 dark:text-blue-800" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd"></path></svg>
          <span className="sr-only">Info</span>
          <div className="ml-3 text-sm font-medium text-blue-700 dark:text-blue-800">
            Transaction in progress an activity has been added to your Notification
          </div>
          <button type="button" onClick={() => setClose(false)} className="ml-auto -mx-1.5 -my-1.5 bg-blue-100 text-blue-500 rounded-lg focus:ring-2 focus:ring-blue-400 p-1.5 hover:bg-blue-200 inline-flex h-8 w-8 dark:bg-blue-200 dark:text-blue-600 dark:hover:bg-blue-300" data-dismiss-target="#alert-1" aria-label="Close">
            <span className="sr-only">Close</span>
            <svg aria-hidden="true" className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd"></path></svg>
          </button>
        </div>
        <div id="alert-2" className={`flex ${!close2 && "hidden"} p-4 mb-4 bg-blue-100 rounded-lg dark:bg-blue-200`} role="alert">
          <svg aria-hidden="true" className="flex-shrink-0 w-5 h-5 text-blue-700 dark:text-blue-800" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd"></path></svg>
          <span className="sr-only">Info</span>
          <div className="ml-3 text-sm font-medium text-blue-700 dark:text-blue-800">
            An Error Occured Ensure That You Have Sufficent Token To Complete Thsi Transaction
          </div>
          <button type="button" onClick={() => setClose2(false)} className="ml-auto -mx-1.5 -my-1.5 bg-blue-100 text-blue-500 rounded-lg focus:ring-2 focus:ring-blue-400 p-1.5 hover:bg-blue-200 inline-flex h-8 w-8 dark:bg-blue-200 dark:text-blue-600 dark:hover:bg-blue-300" data-dismiss-target="#alert-2" aria-label="Close">
            <span className="sr-only">Close</span>
            <svg aria-hidden="true" className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd"></path></svg>
          </button>
        </div>
      </div>
      <div className='font-bungee text-[34px] leading-[250px] flex text-white pl-[286px]'>
        <div>Schedules:</div>
      </div>
      <div className='place-items-center h-full w-full'>
        {meeting?.map((hostMeeting) => hostMeeting.map((item) =>
        (
          <div key={`${item?.index}`} className='flex justify-center pb-10 w-full '>
            {item?.completed == false ?
              <div className='bg-[#2D1300] w-1/2 h-full shadow-[0_6px_10px_4px_rgba(0,0,0,0.5)] rounded-[30px] '>
                <div className='flex justify-between items-center p-6 '>
                  <div className='justify-start pl-6 font-noto font-semibold text-[#817C7C] w-34 text-12'>{moment.unix(item?.start).format("HH:mmA")} - {moment.unix(item?.end).format("HH:mmA")}
                  </div>
                  <div className='justify-center items-center'><p className='justify-center text-12 text-red-400'>{item?.desc}</p></div>
                  <div className='justify-center items-center'> <p className='justify-center text-12 text-[#817C7C]'>{ethers.utils.formatEther(item?.fee)} Matic</p></div>
                  <div className=' items-center pr-7 justify-end'>
                  {item?.booked == false ? (
                      <>
                        {me?.role == "User" ?
                          <div onClick={() => handleCreate(item?.host, item?.index, item?.fee)} className={`text-white  cursor-pointer font-noto rounded-[10px] h-[40px] w-[120px] text-center font-semibold bg-green-600  py-2 text-[14px]`}>
                            Book Session
                          </div>
                          :
                          <div className={`text-white disabled:opacity-70 bg-gray-700 font-noto rounded-[10px] h-[40px] w-[120px] text-center font-semibold py-2   text-[14px]`}>
                            Book Session
                          </div>
                        }
                      </>
                    ) : (

                      <div className={`text-white disabled:opacity-70 bg-gray-700 font-noto rounded-[10px] h-[40px] w-[120px] text-center font-semibold py-2   text-[14px]`}>
                        Book Session
                      </div>

                    )}
                  </div>
                </div>
              </div>
              : ""
            }
          </div>
        )
        ))}
      </div>
    </div>

  )
}


export default Checkschedule












