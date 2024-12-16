import { forwardRef, useEffect, useRef } from 'react';
import { LeftPrimarySection, RightSideSheet } from '../../../Common/styles/commonStyles';
import useWebRTC from '../WebRTC/useWebRTC';
import { useParams } from 'react-router-dom';
import SideSheetVideo from './SideSheetVideo';

interface Props {
  localVideoRef: React.RefObject<HTMLVideoElement>;
  remoteVideoRef: React.RefObject<HTMLVideoElement>;
}

const Contract = forwardRef<HTMLDivElement, Props>(
  ({ localVideoRef, remoteVideoRef }: Props, ref) => {
    console.log(localVideoRef.current);
    // useEffect(() => {
    //   console.log(localVideoRef.current, localVideoRef.current.srcObject);
    // }, [localVideoRef.current]);
    // const { roomId } = useParams();
    // const localVideoRef = useRef<HTMLVideoElement | null>(null);
    // const remoteVideoRef = useRef<HTMLVideoElement | null>(null);
    // const { startVideo, localVideoRef, remoteVideoRef } = useWebRTC({
    //   // signaling,
    //   // sessionId,
    //   localVideoRef,
    //   remoteVideoRef,
    //   roomId,
    // });

    // useEffect(() => {
    //   startVideo();
    // }, []);

    return (
      <div ref={ref}>
        <LeftPrimarySection></LeftPrimarySection>
        <RightSideSheet>
          <SideSheetVideo localVideoRef={localVideoRef} remoteVideoRef={remoteVideoRef} />
        </RightSideSheet>
      </div>
    );
  },
);
export default Contract;
