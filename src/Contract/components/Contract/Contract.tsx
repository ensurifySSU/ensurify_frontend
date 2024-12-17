import { forwardRef } from 'react';
import { LeftPrimarySection, RightSideSheet } from '../../../Common/styles/commonStyles';

import SideSheetVideo from './SideSheetVideo';
import styled from '@emotion/styled';

interface Props {
  localVideoRef: React.RefObject<HTMLVideoElement>;
  remoteVideoRef: React.RefObject<HTMLVideoElement>;
}

const Contract = forwardRef<HTMLDivElement, Props>(
  ({ localVideoRef, remoteVideoRef }: Props, ref) => {
    console.log(localVideoRef.current);

    return (
      <StContainer ref={ref}>
        <LeftPrimarySection>
          <StWrapper>{/* 계약서 부분 */}</StWrapper>
        </LeftPrimarySection>
        <RightSideSheet>
          <SideSheetVideo localVideoRef={localVideoRef} remoteVideoRef={remoteVideoRef} />
          {/* 버튼, ai프롬프트, 모달 부분 */}
        </RightSideSheet>
      </StContainer>
    );
  },
);
export default Contract;

const StContainer = styled.div`
  height: 100%;
`;

const StWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;

  width: 100%;
  height: 100%;

  background-color: #fff;
  border-radius: 10px;
`;
