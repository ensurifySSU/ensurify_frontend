import styled from '@emotion/styled';

const SIDESHEETWIDTH = 28;

const Dashboard = () => {
  return (
    <StContainer>
      <StSideSheet>사이드시트</StSideSheet>
      <StDashboard>
        <div>대시보드 부분</div>
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
    height: 100%;
    background-color: white;
    border-radius: 10px;
  }
`;
