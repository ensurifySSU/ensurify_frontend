import { useEffect, useRef } from 'react';
import { LeftPrimarySection, RightSideSheet } from '../../../Common/styles/commonStyles';
import useWebRTC from '../WebRTC/useWebRTC';
import { useParams } from 'react-router-dom';

const Contract = ({
  localVideoRef,
  remoteVideoRef,
}: {
  localVideoRef: React.RefObject<HTMLVideoElement>;
  remoteVideoRef: React.RefObject<HTMLVideoElement>;
}) => {
  // const { roomId } = useParams();
  // const localVideoRef = useRef<HTMLVideoElement | null>(null);
  // const remoteVideoRef = useRef<HTMLVideoElement | null>(null);
  // const { startVideo } = useWebRTC({
  //   signaling,
  //   sessionId,
  //   localVideoRef,
  //   remoteVideoRef,
  //   roomId,
  // });

  // useEffect(() => {
  //   startVideo();
  // }, []);
  return (
    <div>
      <LeftPrimarySection></LeftPrimarySection>
      <RightSideSheet>
        {/* <SideSheetVideo localVideoRef={localVideoRef} remoteVideoRef={remoteVideoRef} /> */}
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
        </div>
      </RightSideSheet>
    </div>
  );
};

export default Contract;
