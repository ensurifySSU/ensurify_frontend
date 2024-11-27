import styled from '@emotion/styled';
import DashboardTable from './components/DashboardTable';

const SIDESHEETWIDTH = 28;

const Dashboard = () => {
  return (
    <StContainer>
      <StSideSheet>
        <div>상담원 정보</div>
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

  background-color: white;
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
