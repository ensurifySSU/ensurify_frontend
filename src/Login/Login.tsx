import styled from '@emotion/styled';
import { BackGroundAsset1, BackGroundAsset2, BackGroundAsset3 } from './assets';

const Login = () => {
  return (
    <StContainer>
      <StBackGroundAsset1 />
      <StBackGroundAsset2 />
      <StBackGroundAsset3 />
    </StContainer>
  );
};

export default Login;

const StContainer = styled.div`
  width: 100vw;
  height: 100vh;
`;

const StBackGroundAsset1 = styled(BackGroundAsset1)`
  position: fixed;
  top: 0;
  right: 0;
`;

const StBackGroundAsset2 = styled(BackGroundAsset2)`
  position: fixed;
  left: 0;
`;

const StBackGroundAsset3 = styled(BackGroundAsset3)`
  position: fixed;
  right: 0;
  bottom: 0;
`;
