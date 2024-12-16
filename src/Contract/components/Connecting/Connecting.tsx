/** 유저가 회의실에 들어가기 전 게스트로그인하는 페이지 */

import styled from '@emotion/styled';
import { useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import Button from '../../../Common/components/Button';
import { useMutation } from '@tanstack/react-query';
import { guestSignup } from '../../servies/guestSignup';
import { login } from '../../../Login/services';
import { enterRoom } from '../../servies/enterRoom';

const Connecting = () => {
  const navigation = useNavigate();
  const { roomId, clientId } = useParams();

  const onGusetSignup = useMutation({
    mutationFn: guestSignup,
    onSuccess: (data) => {
      onQuestLogin.mutate(data.result);
    },
    onError: (error) => {
      console.log('에러 발생! 아래 메시지를 확인해주세요.', error);
    },
  });

  const onQuestLogin = useMutation({
    mutationFn: login,
    onSuccess: (data) => {
      sessionStorage.setItem('clientToken', data.result.accessToken);
    },
    onError: (error) => {
      console.log('에러 발생! 아래 메시지를 확인해주세요.', error);
    },
  });

  const onEnterRoom = useMutation({
    mutationFn: enterRoom,
    onSuccess: () => {
      navigation(`/contract/${roomId}/${clientId}`);
    },
    onError: (error) => {
      console.log('에러 발생! 아래 메시지를 확인해주세요.', error);
    },
  });

  const handleClick = async () => {
    if (!roomId) return;
    onEnterRoom.mutate(roomId, clientId);
  };

  useEffect(() => {
    //상담원이라면 /contract로 이동
    if (sessionStorage.getItem('token')) navigation(`/contract/${roomId}/${clientId}`);
    onGusetSignup.mutate();
  }, []);
  return (
    <Stcontainer>
      <StWrapper>
        <Button content="계약방 입장하기" width="30rem" handleClick={handleClick} />
      </StWrapper>
    </Stcontainer>
  );
};

export default Connecting;

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
