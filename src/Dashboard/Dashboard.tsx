import styled from '@emotion/styled';
import DashboardTable from './components/DashboardTable';
import CategoryButton from './components/CategoryButton';
import { useQuery } from '@tanstack/react-query';
import { getUserInfo } from '../Common/apis/servies';
import { bankLogo } from '../Home/assets/0_index';

const SIDESHEETWIDTH = 28;

const Dashboard = () => {
  const { data } = useQuery({
    queryKey: ['users'],
    queryFn: getUserInfo,
  });
  return (
    <StContainer>
      <StSideSheet>
        <StAgentInfo>
          <img
            src={bankLogo}
            style={{
              width: '6rem',
              height: '6rem',
              borderRadius: '100px',
            }}
          />
          <StAgentName>{data?.result.name}</StAgentName>
          <StBankName>숭실은행</StBankName>
        </StAgentInfo>
        <StCategory>
          <CategoryButton content="IRP" />
          <CategoryButton content="DB" />
          <CategoryButton content="DC" />
        </StCategory>
      </StSideSheet>
      <StDashboard>
        <div>
          <h1>계약내역</h1>
          <DashboardTable />
        </div>
      </StDashboard>
    </StContainer>
  );
};

export default Dashboard;

const StContainer = styled.div`
  height: 100%;
`;

const StSideSheet = styled.aside`
  position: fixed;
  top: 6rem;
  left: 0;

  width: ${SIDESHEETWIDTH}rem;
  height: 100%;
  padding: 2rem;

  background-color: white;
`;

const StAgentInfo = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  align-items: center;

  padding: 3rem 0;

  border-bottom: 1px solid #000;
`;

const StAgentName = styled.p`
  font-size: 2rem;
  font-weight: 700;
`;

const StBankName = styled.p`
  font-size: 1.5rem;
  font-weight: 500;
`;

const StCategory = styled.div`
  display: flex;
  gap: 1rem;
  padding: 2rem 0;
`;

const StDashboard = styled.div`
  overflow-y: hidden;
  height: 100%;
  margin-left: ${SIDESHEETWIDTH}rem;
  padding: 2rem;

  & > div {
    display: flex;
    flex-direction: column;
    gap: 2rem;

    height: 100%;
    padding: 2rem;

    background-color: white;
    border-radius: 10px;

    & > h1 {
      font-size: 1.6rem;
      font-weight: 600;
    }
  }
`;
