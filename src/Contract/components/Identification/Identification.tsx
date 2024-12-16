import styled from '@emotion/styled';
import { LeftPrimarySection, RightSideSheet } from '../../../Common/styles/commonStyles';
import { forwardRef } from 'react';

const Identification = forwardRef(
  ({
    localVideoRef,
    remoteVideoRef,
  }: {
    localVideoRef: React.RefObject<HTMLVideoElement>;
    remoteVideoRef: React.RefObject<HTMLVideoElement>;
  }) => {
    return (
      <StContainer>
        <LeftPrimarySection>
          <video
            ref={localVideoRef}
            autoPlay
            playsInline
            muted
            style={{ width: '300px', transform: 'scaleX(-1)' }} //거울모드
          />
        </LeftPrimarySection>
        <RightSideSheet>
          <video
            ref={remoteVideoRef}
            autoPlay
            playsInline
            muted={true}
            style={{ width: '300px', transform: 'scaleX(-1)' }}
          />
        </RightSideSheet>
      </StContainer>
    );
  },
);

export default Identification;

const StContainer = styled.div`
  height: 100%;
`;
