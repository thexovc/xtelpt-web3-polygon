import React from 'react';
import Modal from 'react-modal';
import Message from '../components/Message';
import { BsMicFill, BsFillChatLeftFill } from 'react-icons/bs'

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
    height: '630px',
    backgroundColor: '#000000',
    borderRadius: '37px',
    width: '397px',
    border: 'none',
  },
};

// Make sure to bind modal to your appElement (https://reactcommunity.org/react-modal/accessibility/)

function Notification() {
  let subtitle;
  const [modalIsOpen, setIsOpen] = React.useState(false);

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
      <BsFillChatLeftFill className='text-[#ACACAC] h-8 w-8' onClick={openModal} />
      <Modal
        isOpen={modalIsOpen}
        onAfterOpen={afterOpenModal}
        onRequestClose={closeModal}
        style={customStyles}
        contentLabel="Example Modal"
      >
        <div className='flex-1 bg-[#000000]'>
        <div className='text-white sticky top-0' onClick={closeModal}>X</div>
          <Message />
        </div>
      </Modal>
    </div>
  );
}

export default Notification