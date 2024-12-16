import Test2 from './Test2';
import useWebRTCSocket from './useWebRTCSocket';

const WebRtc = () => {
  const { signaling, sessionId } = useWebRTCSocket();
  return (
    <div>{signaling && sessionId && <Test2 signaling={signaling} sessionId={sessionId} />}</div>
  );
};

export default WebRtc;
