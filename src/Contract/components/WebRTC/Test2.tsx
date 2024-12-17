import useWebRTC from './useWebRTC';
import { useNavigate } from 'react-router-dom';

const Test2 = ({ signaling, sessionId }: { signaling: WebSocket; sessionId: String }) => {
  const navigation = useNavigate();
  const roomId = '8';
  // const localVideoRef = useRef<HTMLVideoElement | null>(null);
  // const remoteVideoRef = useRef<HTMLVideoElement | null>(null);
  const { startVideo, localVideoRef, remoteVideoRef } = useWebRTC({ signaling, sessionId, roomId });
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
      <button onClick={() => navigation('/contract/11/1')}>이동</button>
    </div>
  );
};

export default Test2;
