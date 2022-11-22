import { ethers } from 'ethers';
import React, { useContext, useEffect, useState } from 'react';
import { BsSearch } from 'react-icons/bs';
import Modal from 'react-modal';
import { abi } from '../constants';
import { XContext } from '../context/XContext';
const customStyles = {
  overlay: {
    backgroundColor: '#25252580'
  },
  content: {
    top: '50%',
    color: '#252525',
    left: 'auto',
    right: '50%',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
    padding: 10,
    width: '326px',
    height: '338px',
    backgroundColor: '#000000',
    borderRadius: '37px',
    border: 'none',
  },
};


const NewModal = (props) => {
  const [modalIsOpen, setIsOpen] = useState(false);
  const [host, setHost] = useState([])
  const [camp, setCamp] = useState([])

  const { xtelptAddress } = useContext(XContext)

  const searchHost = async () => {

  }

  const updateUIValues = async () => {
    if (props.type == "Host") {
      const provider = new ethers.providers.Web3Provider(window.ethereum)
      const xtelptContract = new ethers.Contract(xtelptAddress, abi, provider)

      const allHost = await xtelptContract.getAllAccount()
      console.log(allHost)

      let arr = []

      for (let i = 0; i < allHost.length; i++) {
        let prof = await xtelptContract.getProfile(allHost[i])
        console.log("prof", prof)
        if (prof.name.toLowerCase() == props.text.toLowerCase()) {
          arr.push(prof)
        }
      }

      if (arr.length > 0) {
        setHost(arr)
      }

    }

    if (props.type == "campaign") {

    }
  }

  function openModal() {
    setIsOpen(true);
  }

  function afterOpenModal() {
  }

  function closeModal() {
    setIsOpen(false);
  }


  useEffect(() => {
    setTimeout(() => {
      updateUIValues()
    }, 1000);
  }, [])


  return (
    <div className='flex'>
      <BsSearch onClick={openModal} height={15} width={15} className='' />
      <Modal
        isOpen={modalIsOpen}
        onAfterOpen={afterOpenModal}
        onRequestClose={closeModal}
        style={customStyles}
        contentLabel="Example Modal"
      >
        <div className='flex-1 bg-[#000000]'>
          <div className='text-white sticky top-0' onClick={closeModal}>X</div>
          <div className='m-4'>
            <div className=' flex-1 text-center w-full '>
              <div className='h-full text-white flex-1 w-full'>
                {host?.map((item) => (
                  <div className='bg-[#D9D9D933] cursor-pointer py-2 h-[40px] w-[296px] text-left flex pl-2 mt-[12px]'>{item?.name}</div>
                ))}
                {!host && (
                  <div className='bg-[#D9D9D933] cursor-pointer py-2 h-[40px] w-[296px] text-left flex pl-2 mt-[12px]'>Nothing To See Here</div>
                )}

              </div>
            </div>
          </div>
        </div>
      </Modal>
    </div>
  );
}

export default NewModal