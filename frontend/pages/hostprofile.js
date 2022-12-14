import React from 'react'
import Header from '../components/home/header'
import Profile from '../components/profile/HostProfile'
import Head from 'next/head'
import styles from '../styles/Home.module.css'

const profile = () => {
  return (
    <div className={styles.container}>
      <Head>
        <title>XTELPT</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className='bg-[#252525] h-full w-full flex-1'>
        <Header />
        <Profile />
      </div>
    </div>
  )
}

export default profile