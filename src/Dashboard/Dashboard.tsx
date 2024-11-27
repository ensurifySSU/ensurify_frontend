import styled from '@emotion/styled';
import DashboardTable from './components/DashboardTable';

const SIDESHEETWIDTH = 28;

const Dashboard = () => {
  return (
    <StContainer>
      <StSideSheet>
        <StAgentInfo>
          <div
            style={{
              width: '7rem',
              height: '7rem',
              backgroundColor: '#ccc',
              borderRadius: '100px',
            }}
          />
          <StAgentName>상담원 이름</StAgentName>
          <StBankName>은행이름</StBankName>
        </StAgentInfo>
        <div>카테고리</div>
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

  padding-bottom: 2rem;

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

const StDashboard = styled.div`
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
