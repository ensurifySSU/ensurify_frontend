import React, { useEffect, useRef, useState } from 'react';

const WebRTCComponent: React.FC = () => {
  const localVideoRef = useRef<HTMLVideoElement>(null);
  const remoteVideoRef = useRef<HTMLVideoElement>(null);
  const peerConnection = useRef<RTCPeerConnection | null>(null);
  const localStreamRef = useRef<MediaStream | null>(null);
  const [isCameraOn, setIsCameraOn] = useState(true);

  useEffect(() => {
    const startLocalStream = async () => {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({ video: true, audio: true });
        localStreamRef.current = stream;
        if (localVideoRef.current && remoteVideoRef.current) {
          localVideoRef.current.srcObject = stream;
        }
      } catch (error) {
        console.error('접근 권환을 허용해주세요', error);
      }
    };

    startLocalStream();

    const createPeerConnection = () => {
      peerConnection.current = new RTCPeerConnection();

      if (localStreamRef.current) {
        localStreamRef.current.getTracks().forEach((track) => {
          peerConnection.current?.addTrack(track, localStreamRef.current!);
        });
      }

      peerConnection.current.ontrack = (event) => {
        const [stream] = event.streams;
        if (remoteVideoRef.current) {
          remoteVideoRef.current.srcObject = stream;
        }
      };
    };

    createPeerConnection();

    return () => {
      localStreamRef.current?.getTracks().forEach((track) => track.stop());
      peerConnection.current?.close();
    };
  }, []);

  const toggleCamera = () => {
    if (localStreamRef.current) {
      localStreamRef.current.getVideoTracks().forEach((track) => {
        track.enabled = !track.enabled;
      });
      setIsCameraOn((prev) => !prev);
    }
  };

  return (
    <div>
      <h1 style={{ fontSize: '30px' }}>WebRTC 프리태스크</h1>
      <video
        ref={localVideoRef}
        autoPlay
        playsInline
        muted
        style={{ width: '250px', height: '200px' }}
      />
      <video
        ref={remoteVideoRef}
        autoPlay
        playsInline
        style={{ width: '250px', height: '200px', backgroundColor: '#ccc' }}
      />
      <button onClick={toggleCamera}>{isCameraOn ? '카메라 켜기' : '카메라 끄기'}</button>
    </div>
  );
};

export default WebRTCComponent;
