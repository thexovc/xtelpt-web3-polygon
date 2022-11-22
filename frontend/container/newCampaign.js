import React, { useState } from 'react';
import Modal from 'react-modal';
import NewNotification from '../components/NewNotification';

const customStyles = {
  overlay: {
    backgroundColor: '#000000',
    opacity: "0.9"
  },
  content: {
    top: '39%',
    color: '#252525',
    left: 'auto',
    right: '66%',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
    padding: 10,
    height: '630px',
    border: '1px solid black',
    backgroundColor: '#252525',
    borderRadius: '37px',
    width: '350px',
    height: '338px',
    border: 'none',
  },
};

const NewCampaign = () => {
  let subtitle;
  const [modalIsOpen, setIsOpen] = useState(false);

  function openModal() {
    setIsOpen(true);
  }

  function afterOpenModal() {
    // references are now sync'd and can be accessed.
    // subtitle.style.color = '#000';
  }

  function closeModal() {
    setIsOpen(false);
  }
  return (
    <div>
      <div className='' onClick={openModal}>NOTIFICATION </div>
      <Modal
        isOpen={modalIsOpen}
        onAfterOpen={afterOpenModal}
        onRequestClose={closeModal}
        ariaHideApp={false}
        style={customStyles}
        contentLabel="Example Modal"
      >
        <div className='flex-1 bg-[#252525]'>
          <div className='text-white text-right font-black font-mono text-2xl mr-4 sticky top-0' onClick={closeModal}>x</div>
          <NewNotification />
        </div>
      </Modal>
    </div>
  );
}

export default NewCampaign