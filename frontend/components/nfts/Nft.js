import React, { useContext, useEffect, useState } from 'react'
import Image from 'next/image'
import { useRouter } from 'next/router'
import { ethers } from 'ethers'
import { XContext } from '../../context/XContext'
import { BsSearch } from 'react-icons/bs'
import axios from 'axios'

const Host = () => {
    const router = useRouter()

    const { nftAbi, nftAddress, me } = useContext(XContext)
    const [ownedNFT, setOwnedNFT] = useState(null)
    const [eth, setEth] = useState()
    const [loading, setLoading] = useState(false)



    const updateUIValues = async () => {


        if (!window.ethereum) {
            return alert('noMetaMask')
        }
        try {
            const addressArray = await window.ethereum.request({
                method: 'eth_accounts',
            })

            if (addressArray.length > 0) {
                let arr = []
                const provider = new ethers.providers.Web3Provider(window.ethereum)
                const xtelptNFTContract = new ethers.Contract(nftAddress, nftAbi, provider)
                const myNFT = await xtelptNFTContract.getMyNFT(addressArray[0])

                for (let i = 0; i < myNFT.length; i++) {
                    await axios.get(`https://gateway.pinata.cloud/ipfs/${myNFT[i]}`)
                        .then(function (response) {
                            console.log(response)
                            if (response.data.name) {
                                arr.push(response.data)
                            }

                        })
                        .catch((err) => {
                            console.log(err)
                        })
                }

                setOwnedNFT(arr)

            } else {
                alert("No MetaMask")

            }

        } catch (err) {
            console.log(err)

        }

    }

    useEffect(() => {
        setTimeout(() => {
            updateUIValues()
        }, 1000);
    }, [me])


    const handleMint = async (cid) => {
        setLoading(true)
        const provider = new ethers.providers.Web3Provider(window.ethereum)
        const signer = provider.getSigner();
        const xtelptNFTContract = new ethers.Contract(nftAddress, nftAbi, signer)

        try {
            const mint = await xtelptNFTContract.safeMint(me?.addr, cid, 1)
            alert("NFT Minted")
            setLoading(false)

        } catch (error) {
            setLoading(false)
            console.log(error)
            return
        }

    }


    return (
        <div>
            <div className='w-full bg-hero bg-left-4 bg-no-repeat bg-right flex-1'>
                <div className='font-bungee text-[34px] leading-[250px] flex  justify-between text-white pl-[286px]'>
                    <div>NFT MARKET:</div>
                    <div className='mt-[100px] mr-[204px]'>
                        <div className='cursor-pointer rounded-[12px] w-[154px] leading-[26px] pt-[6px] flex-auto text-[16px] border-[#EAEDEE] pl-[12px] h-[40px] bg-transparent border-[2px]'>
                            <input type="search" placeholder='Search' onChange={(e) => setText(e.target.value)} className='bg-transparent font-sans w-[110px] outline-none h-[16px]' />
                            <div className='-mt-5 ml-28'>
                                <BsSearch
                                    onClick={() => router.push({
                                        pathname: '/search',
                                        query: { text: text, type: "Host" },
                                    })} height={15} width={15} className='' />
                            </div>
                        </div>
                    </div>
                </div>
                <div className='grid  place-items-center w-full'>

                    <div className='px-[265px] grid grid-cols-2 gap-20 w-full justify-between pb-10'>

                        <div className='bg-[#2D1300] w-[350px] h-[300px] shadow-[0_6px_10px_4px_rgba(0,0,0,0.5)] rounded-[20px] '>
                            <div className='grid place-items-center mt-10 w-full'>
                                <Image src={`https://gateway.pinata.cloud/ipfs/QmbkBGEbppg1tvDH84Tvr5Z8qU6jczFRs7AfNPxsbgjKro`} className="rounded-lg" height={120} width={150} />
                                <div className='font-bungee text-white mt-4'>November Pass</div>
                                <div className='font-noto font-semibold text-white leading-[14px] text-[8px]'>
                                    XTELPT
                                </div>
                                <div onClick={() => handleMint("QmNhSD1BKALgwwT8jYbZ33FD4SYRf17WuC8L4nEQ1MJ8x5")} className='flex font-noto font-semibold text-green-400 mt-2 text-xl  cursor-pointer border-red-400 border-dotted border-2 p-2 rounded-lg'>
                                    {loading ? "Loading ..." : "Mint"}
                                </div>

                            </div>
                        </div>

                    </div>

                </div>

                <div className='font-bungee text-[34px] leading-[250px] flex  justify-between text-white pl-[286px]'>
                    <div>YOUR NFT:</div>

                </div>
                <div className='grid  place-items-center w-full h-full'>
                    {ownedNFT?.map((item) => (
                        <div className='bg-[#2D1300] w-[350px] h-[320px] shadow-[0_6px_10px_4px_rgba(0,0,0,0.5)] rounded-[20px] mb-40 pb-10'>

                            <div className='grid place-items-center mt-10 w-full'>
                                <Image src={item?.image} className="rounded-lg" height={200} width={250} />
                                <div className='font-bungee text-white mt-4'>{item?.attributes?.[0].value} Pass</div>
                                <div className='font-noto font-semibold text-white leading-[14px] text-[8px]'>
                                    {item?.name}
                                </div>

                            </div>

                        </div>
                    ))}

                </div>
            </div>

        </div>
    )
}


export default Host