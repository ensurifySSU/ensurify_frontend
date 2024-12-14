import styled from '@emotion/styled';
import { LogoBig } from '../Common/assets/0_index';
import Button from '../Common/components/Button';
import HomeCard from './components/HomeCard';
import { useNavigate } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { getUserInfo } from '../Common/apis/servies';
import { Suspense } from 'react';

const Home = () => {
  const navigate = useNavigate();

  const { data } = useQuery({
    queryKey: ['users'],
    queryFn: getUserInfo,
  });

  return (
    <Stcontainer>
      <StWrapper>
        <StIntroSection>
          <StIntro>
            <h1>계약의 확실성과 단순함을 한번에</h1>
            <LogoBig />
          </StIntro>
          <Button content="새 계약 생성하기" handleClick={() => navigate('/createRoom')} />
        </StIntroSection>
        <Suspense fallback={<div>로딩중</div>}>
          <HomeCard name={data?.result?.name} />
        </Suspense>
      </StWrapper>
    </Stcontainer>
  );
};

export default Home;

const Stcontainer = styled.div`
  height: 100%;
  padding: 5rem;
  padding-bottom: 0;
`;

const StWrapper = styled.div`
  display: flex;
  gap: 20rem;
  align-items: center;
  justify-content: center;

  height: 100%;
  padding: 5rem;

  background-color: white;
  border-radius: 35px 35px 0 0;
`;

const StIntroSection = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10rem;
`;

const StIntro = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;

  font-size: 3rem;
  font-weight: 600;
  color: #000;
  text-align: left;
`;
