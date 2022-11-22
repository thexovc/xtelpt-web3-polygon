import React, { useState, useEffect, useContext } from 'react'
import Image from 'next/image'
import ProfileImage from '../../assets/profle-p.png'
import { BsPlus, BsSearch } from 'react-icons/bs'
import NewModal from '../../container/newModal'
import { useRouter } from 'next/router'
import { abi } from '../../constants'
import { ethers } from 'ethers'
import { XContext } from '../../context/XContext'

const Campaigns = () => {
  const router = useRouter()
  const { xtelptAddress, me } = useContext(XContext)
  console.log(me)

  const [campaign, setCampaign] = useState()
  const [loading, setLoading] = useState(false)
  const [close, setClose] = useState(false)
  const [text, setText] = useState("")

  const updateUIValues = async () => {

    try {
      const provider = new ethers.providers.Web3Provider(window.ethereum)
      const xtelptContract = new ethers.Contract(xtelptAddress, abi, provider)
      const allCampaign = await xtelptContract.getCampaign()

      console.log(allCampaign)

      setCampaign(allCampaign)
    } catch (error) {
      setCampaign()
      console.log(error)
    }
  }

  const handleVolun = async (id) => {
    const provider = new ethers.providers.Web3Provider(window.ethereum)
    const signer = provider.getSigner();
    const xtelptContract = new ethers.Contract(xtelptAddress, abi, signer)

    try {
      const joinCampaign = await xtelptContract.joinCampaign(id)
      console.log(joinCampaign)
      setClose(true)
    } catch (error) {
      console.log(error)
    }
  }

  const handleHelp = async (id) => {
    setLoading(true)
    const provider = new ethers.providers.Web3Provider(window.ethereum)
    const signer = provider.getSigner();
    const xtelptContract = new ethers.Contract(xtelptAddress, abi, signer)

    try {
      const getHelp = await xtelptContract.getHelp(id)
      console.log(getHelp)
      setClose(true)

      // router.push({
      //   pathname: '/call',
      //   query: { addr: me?.addr },
      // })

    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    setTimeout(() => {
      updateUIValues()
    }, 1000);
  }, [])

  return (
    <div className='w-full h-full bg-hero bg-right flex-1'>
      <div className='sticky-not w-full'>
        <div id="alert-1" class={`flex ${!close && "hidden"} p-4 mb-4 bg-blue-100 rounded-lg dark:bg-blue-200`} role="alert">
          <svg aria-hidden="true" class="flex-shrink-0 w-5 h-5 text-blue-700 dark:text-blue-800" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clip-rule="evenodd"></path></svg>
          <span class="sr-only">Info</span>
          <div class="ml-3 text-sm font-medium text-blue-700 dark:text-blue-800">
            {me?.role == "Host" ? "When you have been paired with a user a notification will appear" : "An activity has been added to your Notification"}
          </div>
          <button type="button" onClick={() => setClose(false)} class="ml-auto -mx-1.5 -my-1.5 bg-blue-100 text-blue-500 rounded-lg focus:ring-2 focus:ring-blue-400 p-1.5 hover:bg-blue-200 inline-flex h-8 w-8 dark:bg-blue-200 dark:text-blue-600 dark:hover:bg-blue-300" data-dismiss-target="#alert-1" aria-label="Close">
            <span class="sr-only">Close</span>
            <svg aria-hidden="true" class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clip-rule="evenodd"></path></svg>
          </button>
        </div>
      </div>
      <div className='font-bungee text-[34px] leading-[250px] flex  justify-between text-white pl-[286px]'>
        <div>CAMPAIGNS:</div>
        <div className='mt-[100px] flex mr-[204px]'>
          <BsPlus className='text-[#A77300]' />
          <div className='rounded-[12px] w-[154px] cursor-pointer leading-[26px] pt-[6px] flex-auto text-[16px] border-[#EAEDEE] pl-[12px] h-[40px] bg-transparent border-[2px]'>
            <input type="search" placeholder='Search' onChange={(e) => setText(e.target.value)} className='bg-transparent font-sans  w-[110px] outline-none h-[16px] ' />
            <div className='-mt-5 ml-28'>
              <BsSearch
                onClick={() => router.push({
                  pathname: '/search',
                  query: { text: text, type: "Camp" },
                })} height={15} width={15} className='' />
            </div>
          </div>
        </div>
      </div>
      <div className='place-items-center h-vh w-full'>
        {campaign?.map((item) => {
          return (
            <div key={item?.start_time} className=' grid justify-center w-full '>

              <div className='bg-[#2D1300] w-[600px] h-[450px] shadow-[0_6px_10px_4px_rgba(0,0,0,0.5)] mb-14 rounded-[30px] '>
                <div className='grid place-items-center p-4 mt-16 w-full'>
                  <Image src={`https://gateway.pinata.cloud/ipfs/${item.image}`} className="rounded-lg" height={150} width={142.67} />
                  <div className='font-bungee text-[24px] mt-2 text-white'>{item?.name.slice(0, 20)}</div>
                  <div className='font-noto text-center font-semibold text-[#817C7C] leading-[14px] mt-4 text-[16px]'>{item?.desc}.</div>
                  <div className='flex items-center w-full justify-center mt-[42px]'>
                    {me?.role == "User" && (
                      <div onClick={() => handleHelp(item?.index)} className={`flex text-white cursor-pointer ${item?.volunteer.length == 0 && ('disabled:opacity-70 bg-gray-700')} font-noto hover:bg-gray-500 rounded-[10px] h-[40px] w-[114px] text-center font-semibold bg-[#A77300] mt-[10px] py-2 pl-[16px] text-[16px]`}>
                        Get Help
                      </div>
                    )}
                    {me?.role == "Host" && (
                      <div onClick={() => handleVolun(item?.index)} className={`flex text-white cursor-pointer hover:bg-gray-500 font-noto rounded-[10px] h-[40px] w-[114px] text-center font-semibold bg-green-500 mt-[5px] py-2 pl-[16px] text-[16px]`}>
                        Volunteer
                      </div>
                    )}
                    {/* <div className='text-right flex'>Voluteer</div> */}
                  </div>
                </div>
                  <div className='flex -mt-[40px] pr-12 w-full'>
                    <div className='text-right text-[#817C7C] hover:text-green-500 hover:text-[16px] text-[14px] ml-auto cursor-pointer'>{item?.volunteer.length} Volunteer</div>
                  </div>

              </div>

            </div>
          )

        }
        )}
      </div>
    </div>
  )
}

export default Campaigns