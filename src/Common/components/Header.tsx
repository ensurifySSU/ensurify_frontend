import styled from '@emotion/styled';
import { IcArrowDown, Logo } from '../assets/0_index';
import { useNavigate } from 'react-router-dom';
import useRole from '../hooks/useRole';
import { useRoleStore } from '../stores/roleStore';
import { useUserInfo } from '../stores/userInfoStore';

const Header = () => {
  const navigation = useNavigate();
  useRole();
  const { role } = useRoleStore();
  const { username } = useUserInfo();

  const renderMenu = () => {
    switch (role) {
      case 'client':
        return <StBtn>나가기</StBtn>;
      case 'user':
        return (
          <StUser>
            <p>{username || '계약 중단하기'}</p>
            <IcArrowDown />
          </StUser>
        );
      case 'guest':
        return <></>;
    }
  };

  return (
    <StContainer>
      <StLogo onClick={() => navigation('/home')} />
      <StTitle>개인형퇴직연금(IRP) 운용관리계약서</StTitle>
      <>{renderMenu()}</>
    </StContainer>
  );
};

export default Header;

const StContainer = styled.header`
  position: fixed;
  z-index: 1;
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
const StTitle = styled.p`
  font-size: 1.8rem;
  font-weight: 600;
`;
const StLogo = styled(Logo)`
  cursor: pointer;
  width: 10rem;
`;

const StBtn = styled.button`
  padding: 0.8rem 3rem;

  font-size: 1.2rem;
  font-weight: 400;

  border: 1px solid #d9d9d9;
  border-radius: 5px;
`;

const StUser = styled.div`
  display: flex;
  align-items: center;

  padding: 0.8rem 2rem;

  font-size: 1.5rem;
  font-weight: 600;

  & svg {
    cursor: pointer;
  }
`;
