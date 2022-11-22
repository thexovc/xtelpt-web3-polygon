import React, { useContext, useState } from 'react'
import Header from '../home/header'
import Image from 'next/image'
import ProfileImage from '../../assets/profile.png'
import Ellipse from '../../assets/Ellipse 2.png'
import { useRouter } from 'next/router'
import { XContext } from '../../context/XContext'
import { ethers } from 'ethers'
import axios from 'axios'
import FormData from 'form-data';


const Auth = () => {

  const { xtelptAddress, abi } = useContext(XContext)

  const [newHost, setNewHost] = useState(false)
  const [loading, setLoading] = useState(false)
  const [file, setFile] = useState()
  const [hostTitle, setHostTitle] = useState("")
  const [name, setName] = useState("")
  const [bio, setBio] = useState("")
  const [ipfsHash, setIpfsHash] = useState('')

  const router = useRouter()

  function handleChange() {
    setNewHost(!newHost)
    console.log(newHost);
  }

  // console.log(xtelptAddress, abi)

  const handleCreate = async () => {

    const provider = new ethers.providers.Web3Provider(window.ethereum)
    const signer = provider.getSigner();
    const xtelptContract = new ethers.Contract(xtelptAddress, abi, signer)

    if (file) {
      console.log('starting')
      console.log(file)

      const formData = new FormData()

      formData.append("file", file)

      const API_KEY = "194b413d599fe41e79d5"
      const API_SECRET = "91668b71fc76cca7e55bcf83c9ecb6ce0e8a2c544da78fab6b76d444f0be7151"

      console.log(formData)
      console.log(API_KEY)
      console.log(API_SECRET)

      // the endpoint needed to upload the file
      const url = `https://api.pinata.cloud/pinning/pinFileToIPFS`

      setLoading(true)

      await axios.post(
        url,
        formData,
        {
          maxContentLength: "Infinity",
          headers: {
            "Content-Type": `multipart/form-data;boundary=${formData._boundary}`,
            'pinata_api_key': API_KEY,
            'pinata_secret_api_key': API_SECRET

          }
        }
      )
        .then(async (response) => {

          console.log(response)
          setIpfsHash(response.data.IpfsHash)


          if (newHost) {
            console.log("creating host")
            const createHost = await xtelptContract.createHost(0, name, response.data.IpfsHash, bio, hostTitle)
            window.location.href = "/profile"
          } else {
            console.log("creating user")
            const createUser = await xtelptContract.createUser(0, name, response.data.IpfsHash, bio)
            window.location.href = "/profile"
          }

        })
        .catch((err) => {
          setLoading(false)
          console.log(err)
        })

      // get the hash

    } else {
      alert("SELECT A FILE")
      return
    }

  }
  

  return (
    <div className='bg-[#252525]'>
      <div className='bg-hero bg-right w-full bg-no-repeat flex h-screen'>
        <div className='grid w-full place-items-center'>
          <div className='text-[32px] font-noto text-white font-semibold'>Edit Profile details</div>
          {file ?
            <Image src={URL.createObjectURL(file)} width="100px" height="100px" className='rounded-full border-x-white border-r-2' />
            :
          <Image src={ProfileImage} width="100px" height="100px" />
          }
          <input type="file" onChange={(event) => setFile(event.target.files[0])} className='border-[#EAEDEE] rounded-[12px] text-white w-[426px] py-2 px-2 h-[50px] border-2' accept="image/*" />
          <input onChange={(e) => setName(e.target.value)} maxLength="130" className='w-[426px] h-[50px] bg-transparent rounded-[12px] text-white border-2 pl-2' placeholder='Fullname' />
          {/* Host Toggle */}
          <div className='flex pr-72'>
            <div className='pr-2 -mt-1 text-[20px] text-[#FFFFFF]' title='Become a Host'>
              Host?</div>
            <label for="yellow-toggle" className="inline-flex relative items-center mr-5 cursor-pointer">
              <input type="checkbox" onChange={handleChange} value={newHost} id="yellow-toggle" className="sr-only peer" />
              <div className="w-11 h-6 bg-gray-200 rounded-full peer dark:bg-gray-700 peer-focus:ring-4 peer-focus:ring-yellow-300 dark:peer-focus:ring-yellow-800 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-yellow-400"></div>
            </label>
          </div>
          {newHost ? <input onChange={(e) => setHostTitle(e.target.value)} className='w-[426px] h-[50px] bg-transparent rounded-[12px] text-white border-2 pl-2' placeholder='Host Type?' /> : null}
          <textarea onChange={(e) => setBio(e.target.value)} maxLength="40" className='w-[426px] h-[221px] rounded-[12px] text-white bg-transparent border-2 px-2' placeholder='Bio' />
          <div onClick={handleCreate} className='font-noto bg-[#755204] hover:bg-gray-500 cursor-pointer text-[14px] h-[41px] rounded-[12px] text-center px-2 py-2 w-[150px] text-white'>{loading ? "Loading ..." : "Create Profile"}</div>
          <br />
          <br />
        </div>
      </div>
    </div>
  )
}

export default Auth