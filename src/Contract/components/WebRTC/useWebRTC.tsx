// src/useWebRTC.js

import { useEffect, useRef } from 'react';

// STUN 서버 설정
const configuration = {
  iceServers: [
    { urls: 'stun:stun.l.google.com:19302' },
    // { urls: 'stun:stun.l.google.com:5349' },
    // { urls: 'stun:stun1.l.google.com:3478' },
    // { urls: 'stun:stun1.l.google.com:5349' },
    // { urls: 'stun:stun2.l.google.com:19302' },
    // { urls: 'stun:stun2.l.google.com:5349' },
    // { urls: 'stun:stun3.l.google.com:3478' },
    // { urls: 'stun:stun3.l.google.com:5349' },
    // { urls: 'stun:stun4.l.google.com:19302' },
    // { urls: 'stun:stun4.l.google.com:5349' },
  ],
};

const useWebRTC = ({
  signaling,
  sessionId,
  // localVideoRef,
  // remoteVideoRef,
  roomId,
}: {
  signaling: WebSocket;
  sessionId: String;
  // localVideoRef: React.RefObject<HTMLVideoElement>;
  // remoteVideoRef: React.RefObject<HTMLVideoElement>;
  roomId: string | undefined;
}) => {
  const localVideoRef = useRef<HTMLVideoElement | null>(null);
  const remoteVideoRef = useRef<HTMLVideoElement | null>(null);
  const localStreamRef = useRef<MediaStream>();
  const remoteStreamRef = useRef<MediaStream>();
  //peerConnection
  const peerConnectionRef = useRef<RTCPeerConnection>(new RTCPeerConnection(configuration));

  useEffect(() => {
    signaling.onmessage = async (event) => {
      const message = JSON.parse(event.data);
      console.log('Received from server:', message);

      if (message.type === 'all_users') {
        if (message.allUsers?.length > 0) {
          await createPeerConnection(message.sender, message.allUsers[0]);
          await createOffer(message.sender, message.allUsers[0]);
        }
      }
      if (message.type === 'offer') {
        if (!peerConnectionRef.current) return;
        await answerOffer(message.offer, message.sender, message.receiver);
      }
      if (message.type === 'answer') {
        if (!peerConnectionRef.current) return;
        peerConnectionRef.current.setRemoteDescription(message.offer);
        // await getAllUsers();
      }
      if (message.type === 'candidate') {
        await peerConnectionRef.current.addIceCandidate(new RTCIceCandidate(message.candidate));
        console.log('addcandidate');
      }
      if (message.type === 'leave') {
        // alert('상대가 방을 나갔습니다.');
        // remoteVideoRef.current = null;
      }
    };
  }, [signaling]);

  const createOffer = async (_sender: string, _reciever: string) => {
    if (!peerConnectionRef.current) return;
    try {
      //pc설정
      // peerConnectionRef.current = new RTCPeerConnection(configuration);
      const offer = await peerConnectionRef.current.createOffer();
      await peerConnectionRef.current.setLocalDescription(offer);
      signaling.send(
        JSON.stringify({
          type: 'offer',
          roomId: Number(roomId),
          sender: _sender, // sessionId
          receiver: _reciever, // sessionId
          offer: offer,
          sdp: {},
        }),
      );
      console.log('success creat offer');
    } catch (error) {
      console.error('Error creating offer:', error);
    }
  };

  const answerOffer = async (
    _offer: RTCSessionDescriptionInit,
    _sender: string,
    _receiver: string,
  ) => {
    console.log('answer보내기');
    await createPeerConnection(_sender, _receiver);
    console.log('anser createPC');
    try {
      // const offer = await peerConnectionRef.current.createOffer();
      await peerConnectionRef.current.setRemoteDescription(_offer);
      // const offer = await peerConnectionRef.current.createOffer();
      // await peerConnectionRef.current.setRemoteDescription(offer);
      const answer = await peerConnectionRef.current.createAnswer();
      await peerConnectionRef.current.setLocalDescription(answer);
      // Signaling 서버에 Answer 전송
      signaling.send(
        JSON.stringify({
          type: 'answer',
          roomId: Number(roomId),
          sender: _receiver, // sessionId
          receiver: _sender, // sessionId
          offer: answer,
          sdp: {},
        }),
      );
      console.log('Answer 전송 성공');
    } catch (error) {
      console.error('Offer 처리 중 에러 발생:', error);
    }
  };

  const startVideo = async () => {
    if (!peerConnectionRef.current) return;
    //localVideo에 정보 저장
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: true, audio: true });

      localStreamRef.current = stream;
      if (localVideoRef.current) {
        localVideoRef.current.srcObject = stream;
      }
      // 내 video, audio 트랙을 모두 pc에 저장해야함
      // stream.getTracks().forEach((track) => peerConnectionRef.current.addTrack(track, stream));
      //pc에 저장하고 시그너링 서버에 알리기
      try {
        signaling.send(
          JSON.stringify({
            type: 'join_room',
            roomId: Number(roomId),
            sender: sessionId,
          }),
        );
        console.log('join_room 성공!');
      } catch {
        console.log('candidate error');
      }
    } catch (error) {
      console.error('접근 권환을 허용해주세요', error);
    }
  };

  //createpeerConnection
  const createPeerConnection = async (_sender: string, _receiver: string) => {
    peerConnectionRef.current.onicecandidate = (event) => {
      if (event.candidate) {
        signaling.send(
          JSON.stringify({
            type: 'candidate',
            roomId: Number(roomId),
            sender: _sender,
            receiver: _receiver,
            candidate: event.candidate,
          }),
        );
      }
    };
    peerConnectionRef.current.ontrack = (event) => {
      console.log(event);
      if (event.streams[0] && remoteVideoRef.current) {
        remoteStreamRef.current = event.streams[0];
        if (remoteVideoRef.current.srcObject !== event.streams[0]) {
          remoteVideoRef.current.srcObject = event.streams[0];
          console.log('romete video 정보 받아와 저장', event.streams[0].getVideoTracks());
        }
      }
    };

    if (localStreamRef.current) {
      console.log('localstream add');

      localStreamRef.current.getTracks().forEach((track) => {
        if (!localStreamRef.current) return;
        peerConnectionRef.current.addTrack(track, localStreamRef.current);
      });
    } else {
      console.log('no local stream');
    }

    console.log('candidate 성공!');
  };

  return {
    localVideoRef,
    remoteVideoRef,
    localStreamRef,
    remoteStreamRef,
    startVideo,
  };
};

export default useWebRTC;
