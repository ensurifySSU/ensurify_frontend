import styled from '@emotion/styled';
import { useNavigate } from 'react-router-dom';
import { bankLogo } from '../assets/0_index';

const HomeCard = ({ name }: { name: string }) => {
  const navigate = useNavigate();
  return (
    <StContainer>
      <StBankInfo>
        <div>
          <img src={bankLogo} alt="은행 로고" />
          <span>숭실은행</span>
        </div>
        <StGoDashboard onClick={() => navigate('/dashboard')}>
          계약 내역 보러가기 &gt;
        </StGoDashboard>
      </StBankInfo>
      <StAgentInfo>
        <StLabel>상담원 정보</StLabel>
        <div style={{ width: '12rem', height: '15rem', backgroundColor: '#ccc' }} />
        <p>{name}</p>
      </StAgentInfo>
    </StContainer>
  );
};

export default HomeCard;

const StContainer = styled.section`
  width: 32rem;
  height: 45rem;
  padding: 3rem;

  border-radius: 20px;
  box-shadow: 0 2px 10px 0 rgb(0 0 0 / 20%);
`;

const StBankInfo = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;

  padding-bottom: 3rem;

  border-bottom: 1px solid #000;

  & > div {
    display: flex;
    gap: 1rem;
    align-items: center;

    font-size: 2rem;
    font-weight: 700;
  }

  & img {
    width: 3.8rem;
  }
`;

const StGoDashboard = styled.button`
  width: fit-content;
  font-size: 1.6rem;
  font-weight: 700;
  color: ${({ theme }) => theme.colors.blue};

  &:hover {
    color: ${({ theme }) => theme.colors.mint};
  }
`;

const StAgentInfo = styled.div`
  display: flex;
  flex-direction: column;
  gap: 3rem;
  align-items: center;

  padding-top: 3rem;

  font-size: 1.6rem;
  font-weight: 700;
`;

const StLabel = styled.p`
  align-self: baseline;
`;
