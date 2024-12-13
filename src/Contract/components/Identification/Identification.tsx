import styled from '@emotion/styled';
import { LeftPrimarySection, RightSideSheet } from '../../../Common/styles/commonStyles';

const Identification = () => {
  return (
    <StContainer>
      <LeftPrimarySection></LeftPrimarySection>
      <RightSideSheet>
        <>영상</>
      </RightSideSheet>
    </StContainer>
  );
};

export default Identification;

const StContainer = styled.div`
  height: 100%;
`;
