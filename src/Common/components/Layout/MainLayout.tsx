import styled from '@emotion/styled';
import Header from '../Header';
import { Outlet } from 'react-router-dom';

const MainLayout = () => {
  return (
    <StContainer>
      <Header />
      <StMain>
        <Outlet />
      </StMain>
    </StContainer>
  );
};

export default MainLayout;

const StContainer = styled.div`
  width: 100vw;
  height: calc(100vh - 6rem);
`;

const StMain = styled.main`
  height: 100%;
  margin-top: 6rem;
  background-color: #f1f3f3;
`;
