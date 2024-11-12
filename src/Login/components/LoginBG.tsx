import styled from '@emotion/styled';
import { BackGroundAsset1, BackGroundAsset2, BackGroundAsset3 } from '../assets/0_index';

//로그인 뷰 배경 에셋 이미지
const LoginBG = () => {
  return (
    <>
      <StBackGroundAsset1 />
      <StBackGroundAsset2 />
      <StBackGroundAsset3 />
    </>
  );
};

export default LoginBG;

const StBackGroundAsset1 = styled(BackGroundAsset1)`
  position: fixed;
  z-index: -1;
  top: 0;
  right: 0;

  width: 25%;
`;

const StBackGroundAsset2 = styled(BackGroundAsset2)`
  position: fixed;
  z-index: -1;
  top: -5%;
  left: 0;

  width: 15%;
`;

const StBackGroundAsset3 = styled(BackGroundAsset3)`
  position: fixed;
  z-index: -1;
  right: 0;
  bottom: 0;

  width: 25%;
`;
