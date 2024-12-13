// src/WebRTC.js

import { useRef, useEffect, useState } from 'react';

const WebRTC = ({ signaling, sessionId }: { signaling: WebSocket; sessionId: String }) => {
  const localVideoRef = useRef<HTMLVideoElement | null>(null);
  const remoteVideoRef = useRef<HTMLVideoElement | null>(null);
  const localStreamRef = useRef<MediaStream | null>(null);
  //peerConnection
  const peerConnectionRef = useRef<RTCPeerConnection | null>(null);
  const [dataChannel, setDataChannel] = useState<RTCDataChannel | null>(null);
  const [, setSender] = useState();
  const [reciever, setReciever] = useState();

  useEffect(() => {
    // const localVideo = localVideoRef.current;
    // const remoteVideo = remoteVideoRef.current;
    //pc설정
    // STUN 서버 설정
    const configuration = {
      iceServers: [
        {
          urls: 'stun:stun.l.google.com:19302',
        },
      ],
    };
    peerConnectionRef.current = new RTCPeerConnection(configuration);
    try {
      if (!reciever || !sessionId || !localStreamRef.current) return;
      localStreamRef.current
        .getTracks()
        .forEach((track) => peerConnectionRef.current?.addTrack(track, localStreamRef.current!));
      peerConnectionRef.current.onicecandidate = (event) => {
        if (event.candidate) {
          signaling.send(
            JSON.stringify({
              type: 'candidate',
              roomId: 1,
              sender: sessionId,
              receiver: reciever,
              candidate: event.candidate,
            }),
          );
        }
      };
      peerConnectionRef.current.ontrack = (event) => {
        console.log('ontract:', event);
        const [stream] = event.streams;
        if (remoteVideoRef.current) {
          remoteVideoRef.current.srcObject = stream;
          console.log('romete video 정보 받아와 저장', remoteVideoRef.current);
        }
      };
      console.log('candidate 성공!');
    } catch {
      console.log('candidate error');
    }

    //데이터 채널 설정
    const channel = peerConnectionRef.current.createDataChannel('chat');
    channel.onopen = () => console.log('Data channel is open');
    setDataChannel(channel);

    // 데이터 채널 수신 설정
    peerConnectionRef.current.ondatachannel = (event) => {
      const receiveChannel = event.channel;
      receiveChannel.onmessage = (event) => {
        alert(`저쪽에서.. "${event.data}" 이랍니다.`);
      };
    };
    signaling.onmessage = async (message) => {
      const data = JSON.parse(message.data);
      console.log(data);
      // if (data.offer) {
      //   await peerConnectionRef.current?.setRemoteDescription(
      //     new RTCSessionDescription(data.offer),
      //   );
      //   const answer = await peerConnectionRef.current?.createAnswer();
      //   await peerConnectionRef.current?.setLocalDescription(answer);
      //   signaling.send(JSON.stringify({ answer }));
      // }
      // if (data.answer) {
      //   await peerConnectionRef.current?.setRemoteDescription(
      //     new RTCSessionDescription(data.answer),
      //   );
      // }
    };
    return () => {
      console.log('peerConnection close');
      if (peerConnectionRef.current) peerConnectionRef.current.close();
    };
  }, [signaling]);

  const createOffer = async () => {
    if (!peerConnectionRef.current) return;
    console.log(sessionId, reciever);
    try {
      const offer = await peerConnectionRef.current.createOffer();
      await peerConnectionRef.current.setLocalDescription(offer);
      signaling.send(
        JSON.stringify({
          type: 'offer',
          roomId: 1,
          sender: sessionId, // sessionId
          receiver: reciever, // sessionId
          offer: offer,
          sdp: offer.sdp,
        }),
      );
      console.log('success offer');
    } catch (error) {
      console.error('Error creating offer:', error);
    }
  };

  const answerOffer = async () => {
    if (!peerConnectionRef.current) return;
    console.log(sessionId, reciever);
    try {
      const offer = await peerConnectionRef.current.createOffer();
      await peerConnectionRef.current.setRemoteDescription(offer);
      const answer = await peerConnectionRef.current.createAnswer();
      await peerConnectionRef.current.setLocalDescription(answer);
      console.log(answer);
      signaling.send(
        JSON.stringify({
          type: 'answer',
          roomId: 1,
          sender: sessionId, // sessionId
          receiver: reciever, // sessionId
          offer: answer,
          sdp: answer.sdp,
        }),
      );
      console.log('success answer');
      signaling.onmessage = (event) => {
        const message = JSON.parse(event.data);
        console.log('Received from server[answer]:', message);

        if (message.type === 'error') {
          console.error('Server error:', message.error);
        }
      };
    } catch (error) {
      console.error('Error creating offer:', error);
    }
  };

  const sendMessage = () => {
    if (dataChannel && dataChannel.readyState === 'open') {
      dataChannel.send('안녕 ㅋㅋ');
    }
  };

  const startVideo = async () => {
    //localVideo에 정보 저장
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: true, audio: true });
      localStreamRef.current = stream;
      if (localVideoRef.current) {
        localVideoRef.current.srcObject = stream;
      }
      stream.getTracks().forEach((track) => peerConnectionRef.current?.addTrack(track, stream));
      signaling.send(
        JSON.stringify({
          type: 'join_room',
          roomId: 1,
          sender: sessionId,
        }),
      );
      signaling.onmessage = (event) => {
        const message = JSON.parse(event.data);
        console.log('Received from server:', message);
        setSender(message.sender);
        if (message.allUsers?.length > 0) {
          setReciever(message.allUsers[0]);
        }

        if (message.type === 'error') {
          console.error('Server error:', message.error);
        }
      };
    } catch (error) {
      console.error('접근 권환을 허용해주세요', error);
    }
  };

  return (
    <div>
      <video
        ref={localVideoRef}
        autoPlay
        playsInline
        muted
        style={{ width: '300px', transform: 'scaleX(-1)' }} //거울모드
      />
      <video
        ref={remoteVideoRef}
        autoPlay
        playsInline
        style={{ width: '300px', transform: 'scaleX(-1)' }}
      />
      <br />
      <button onClick={startVideo}>Start Video</button>
      <button onClick={createOffer}>Create Offer</button>
      <button onClick={answerOffer}>Answer Offer</button>
      <button onClick={sendMessage}>Send Message</button>
    </div>
  );
};

export default WebRTC;
