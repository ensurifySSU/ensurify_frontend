import styled from '@emotion/styled';
import { Logo } from '../assets/0_index';

const Header = () => {
  return (
    <StContainer>
      <StLogo />
    </StContainer>
  );
};

export default Header;

const StContainer = styled.header`
  position: fixed;
  top: 0;
  right: 0;
  left: 0;

  display: flex;
  align-items: center;
  justify-content: space-between;

  width: 100vw;
  height: 6rem;
  padding: 0 3rem;

  background-color: white;
`;

const StLogo = styled(Logo)`
  width: 10rem;
`;
