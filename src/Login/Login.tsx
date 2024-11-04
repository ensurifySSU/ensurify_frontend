import styled from '@emotion/styled';
import { BackGroundAsset1, BackGroundAsset2, BackGroundAsset3 } from './assets/0_index';
import { Logo } from '../Common/assets/0_index';

const Login = () => {
  return (
    <StContainer>
      <div>
        <div>
          <div>
            <h2>계약의 확실성과</h2>
            <h2>단순함을 한번에</h2>
          </div>
          <div>
            <Logo />
          </div>
        </div>
      </div>
      <div>로그인 부분</div>
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
