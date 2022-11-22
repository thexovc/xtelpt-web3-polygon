import { ethers } from 'ethers'
import { useEffect, useContext, useState } from 'react'
import { abi } from '../constants'
import { XContext } from '../context/XContext'

const useProfile = (addr) => {
    const [profile, setProfile] = useState(null)

    const { xtelptAddress } = useContext(XContext)

    const updateUIValues = async () => {
        const provider = new ethers.providers.Web3Provider(window.ethereum)
        const xtelptContract = new ethers.Contract(xtelptAddress, abi, provider)

        try {
            const addressArray = await window.ethereum.request({
                method: 'eth_accounts',
            })
            if (addressArray.length > 0) {
                let prof = await xtelptContract.getProfile(addr)
                setProfile(prof)
                console.log(prof)
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
    }, [addr])


    return [profile]
}

export default useProfile