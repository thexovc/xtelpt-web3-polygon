import React, { useContext } from 'react'
import Image from 'next/image'
import Logo from '../../assets/Logo.png'
import Notification from '../../container/notification';
import { useRouter } from "next/router";
import { XContext } from '../../context/XContext';
import Notconnected from './notConnected';
import Connected from './connected';

const Nocon = (
  <div >
      <div onClick={() => connectWallet()} className='bg-[#A77300] text-[12px] font-noto cursor-pointer font-semibold py-3 mt-[57px] w-[120px] h-[40px] text-center rounded-[30px]'>CONNECT WALLET</div>
  </div>
)

const Con = (
  <div >
  <div onClick={() => connectWallet()} className='bg-[#A77300] text-[12px] font-noto cursor-pointer font-semibold py-3 mt-[57px] w-[120px] h-[40px] text-center rounded-[30px]'>mena</div>
</div>
)

const Header = () => {
  const { connectWallet, appStatus, currentAccount } = useContext(XContext)
  const router = useRouter()
  const user = 'Efemena'
  return (
      <div>
        {currentAccount? (
           <Connected /> 
        ):(
          <Notconnected/>
        ) }
        </div>

  )
  }
 

export default Header