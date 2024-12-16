import useWebRTC from './useWebRTC';

const Test2 = ({ signaling, sessionId }: { signaling: WebSocket; sessionId: String }) => {
  const { localVideoRef, remoteVideoRef, startVideo } = useWebRTC({ signaling, sessionId });
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
