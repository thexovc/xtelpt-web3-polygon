import Image from 'next/image'
import { BsMicFill, BsSoundwave } from 'react-icons/bs'
import { MdAddReaction, MdCable, MdCall } from 'react-icons/md'
import React, { useEffect, useContext, useRef, useState } from "react";
import { XContext } from "../context/XContext";
import {
  HuddleClientProvider,
  getHuddleClient,
  useRootStore,
} from "@huddle01/huddle01-client";
import PeerVideoAudioElem from "./PeerVideoAudioElem";
import { useRouter } from 'next/router'
import useProfile from '../hooks/useProfile'

const Call = () => {
  const router = useRouter()

  const { me } = useContext(XContext)

  const [hostProfile] = useProfile(router.query.hostAddr)
  const [userProfile] = useProfile(router.query.userAddr)


  const { currentAccount } = useContext(XContext)
  const huddleClient = getHuddleClient("i4pzqbpxza8vpijQMwZsP1H7nZZEHOTN3vR4NdNS");
  const stream = useRootStore((state) => state.stream);
  const enableStream = useRootStore((state) => state.enableStream);
  const pauseTracks = useRootStore((state) => state.pauseTracks);
  const isCamPaused = useRootStore((state) => state.isCamPaused);
  const peers = useRootStore((state) => state.peers);
  const peerId = useRootStore((state) => state.peerId);
  const lobbyPeers = useRootStore((state) => state.lobbyPeers);
  const roomState = useRootStore((state) => state.roomState);
  const meetingRoom = router.query.hostAddr

  const handleJoin = async () => {
    try {
      await huddleClient.join(meetingRoom, {
        address: { currentAccount },
        wallet: "",
        ens: "axit.eth",
      });
      console.log("joined");
    } catch (error) {
      console.log({ error });
    }
  };

  const videoRef = useRef(null);

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.srcObject = stream;
    }
  }, [stream]);

  useEffect(() => {
    console.log({ peers: Object.values(peers), peerId, isCamPaused });
  }, [peers, peerId, isCamPaused]);

  return (
    <HuddleClientProvider value={huddleClient}>
      <div className='w-full h-screen bg-hero bg-right-bottom bg-no-repeat flex-1'>

        <div className='grid place-items-center  h-full w-full'>
          <div className="peers-grid">
            {Object.values(peers).map((peer) => (
              <PeerVideoAudioElem peerIdAtIndex={peer.peerId} />
            ))}
          </div>
          <div className='flex justify-center -mt-12 items-center mb-[11px] w-full '>
            <div className='w-[274px] flex h-[276px] rounded-full bg-[#D9D9D940]'>
              <div className='w-[252px] flex h-[258px] ml-[12px] mt-2 rounded-full bg-[#252525]'>
                <div className='w-[228px] flex h-[236px] ml-[12px] mt-3 rounded-full bg-[#D9D9D9BF]'>
                  <div className='pt-1 pl-[6px] '>
                    {me?.role == "Host" && (
                      <Image src={`https://gateway.pinata.cloud/ipfs/${userProfile?.profilePic}`} className='rounded-full' height={225} width={214} />
                    )}
                    {me?.role == "User" && (
                      <Image src={`https://gateway.pinata.cloud/ipfs/${hostProfile?.profilePic}`} className='rounded-full' height={225} width={214} />
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
          {!roomState.joined ? <div className='font-bungee -mt-12 text-[20px] text-red-700'> Meeting Room is Open To Join</div> : <div className='font-bungee -mt-28 text-[20px] text-green-500'>Meeting Room is Active</div>}

          <div className='bottom-0 bg-[#755204] -mt-36 rounded-[10px] place-items-center h-[50px] w-5/6'>
            <div className='flex py-4 w-full  justify-center items-center'>

              <BsSoundwave className='text-[#ACACAC] mr-7 cursor-pointer h-6 w-6' title='Enables stream for connection' onClick={() => enableStream()} />
              <BsMicFill onClick={handleJoin} title="Opens a meeting room " className='text-[#ACACAC] cursor-pointer mr-7 h-6 w-6' />

              <MdCable onClick={() => huddleClient.allowAllLobbyPeersToJoinRoom()} title="Allow peer" className='text-[#ACACAC] cursor-pointer mr-7 h-6 w-6' />
              <MdCall className='text-white ml-10 bg-red-700 rounded-full border-2 p-1 border-white cursor-pointer h-7 w-7 ' title='End call' onClick={() => pauseTracks()} />
            </div>
          </div>
        </div>
      </div>
    </HuddleClientProvider>
  )
}

export default Call