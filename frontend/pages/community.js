import React from 'react'
import Header from '../components/home/header'
import Head from 'next/head'
import Image from 'next/image'
import CUM from '../assets/CUM.png'
import styles from '../styles/Home.module.css'

const community = () => {
  return (
<div className={styles.container}>
      <Head>
        <title>Coming Soon</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className='bg-[#252525] h-screen w-full flex-1'>
      <Header/>
       <div className='justify-center w-full self-center flex p-44'> <Image src={CUM} height={200} width={300} /> </div>
    </div>
    </div>
  )
}

export default community