import React from 'react';

const SideSheetVideo = ({
  localVideoRef,
  remoteVideoRef,
}: {
  localVideoRef: React.RefObject<HTMLVideoElement>;
  remoteVideoRef: React.RefObject<HTMLVideoElement>;
}) => {
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
    </div>
  );
};

export default SideSheetVideo;
