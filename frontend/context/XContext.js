import { createContext, useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import { abi, nftAbi } from '../constants'
import { ethers } from 'ethers'

export const XContext = createContext()

export const XProvider = ({ children }) => {
  const [appStatus, setAppStatus] = useState('')
  const [currentAccount, setCurrentAccount] = useState('')
  const [currentUser, setCurrentUser] = useState({})
  const [me, setMe] = useState()

  const router = useRouter()

  const xtelptAddress = "0x7Ecf99Aa766083096c5B9f237BD16B7177da0158"
  const nftAddress = "0x6fA103f522D0a8BFb56424b27A5E1314E4458829"


  useEffect(() => {
    checkIfWalletIsConnected()
  }, [])


  const checkIfWalletIsConnected = async () => {
    if (!window.ethereum) return setAppStatus('noMetaMask')
    try {
      const addressArray = await window.ethereum.request({
        method: 'eth_accounts',
      })
      if (addressArray.length > 0) {
        setAppStatus('connected')
        setCurrentAccount(addressArray[0])
        createUserAccount(addressArray[0])
      } else {
        // if (!me) {
        //   router.push('/')
        // }

        setAppStatus('notConnected')
      }
    } catch (err) {
      // if (!me) {
      //   router.push('/')
      // }
      setAppStatus('error')
    }
  }

  const connectWallet = async () => {
    if (!window.ethereum) {
      alert("Please Install MetaMask")
      return
    }
    try {
      setAppStatus('loading')

      const addressArray = await window.ethereum.request({
        method: 'eth_requestAccounts',
      })

      if (addressArray.length > 0) {
        setCurrentAccount(addressArray[0])
        createUserAccount(addressArray[0])

        if (window.ethereum) {
          const currentChainId = await window.ethereum.request({
            method: 'eth_chainId',
          });

          // return true if network id is the same
          if (currentChainId != "80001") {
            alert("Switch To Mumbai Testnet")
          }
        }

      } else {

        setAppStatus('notConnected')
      }
    } catch (err) {
      setAppStatus('error')
    }
  }


  const updateUIValues = async () => {
    const provider = new ethers.providers.Web3Provider(window.ethereum)
    const xtelptContract = new ethers.Contract(xtelptAddress, abi, provider)

    try {
      const addressArray = await window.ethereum.request({
        method: 'eth_accounts',
      })
      if (addressArray.length > 0) {
        let prof = await xtelptContract.getProfile(`${addressArray[0]}`)
        setMe(prof)
        // console.log(me)
      } else {
        console.log("no metamask")
      }
    } catch (err) {
      console.log("an error occured")
    }

  }

  useEffect(() => {
    setTimeout(() => {
      updateUIValues()
    }, 300);
  }, [currentAccount])




  return (
    <XContext.Provider
      value={{
        appStatus,
        currentAccount,
        connectWallet,
        setAppStatus,
        xtelptAddress,
        nftAddress,
        nftAbi,
        abi,
        me
      }}
    >
      {children}
    </XContext.Provider>
  )
}