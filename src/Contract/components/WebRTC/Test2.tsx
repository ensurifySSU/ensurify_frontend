import { useRef } from 'react';
import useWebRTC from './useWebRTC';

const Test2 = ({ signaling, sessionId }: { signaling: WebSocket; sessionId: String }) => {
  const roomId = '8';
  const localVideoRef = useRef<HTMLVideoElement | null>(null);
  const remoteVideoRef = useRef<HTMLVideoElement | null>(null);
  const { startVideo } = useWebRTC({ signaling, sessionId, localVideoRef, remoteVideoRef, roomId });
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
        muted={true}
        style={{ width: '300px', transform: 'scaleX(-1)' }}
      />
      <br />
      <button onClick={startVideo}>Start Video</button>
    </div>
  );
};

export default Test2;
