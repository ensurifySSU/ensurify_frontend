import styled from '@emotion/styled';
import React from 'react';

const SideSheetVideo = ({
  localVideoRef,
  remoteVideoRef,
}: {
  localVideoRef: React.RefObject<HTMLVideoElement>;
  remoteVideoRef: React.RefObject<HTMLVideoElement>;
}) => {
  return (
    <StContainer>
      <StVideo ref={localVideoRef} autoPlay playsInline muted />
      <StVideo ref={remoteVideoRef} autoPlay playsInline muted={true} />
    </StContainer>
  );
};

export default SideSheetVideo;

const StContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  align-items: center;
`;

const StVideo = styled.video`
  width: 90%;
  height: 15rem;
  background-color: #d9d9d9;
`;
