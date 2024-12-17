import styled from '@emotion/styled';
import { LogoBig } from '../Common/assets/0_index';
import { ILoginValue } from './types/loginTypes';
import { ChangeEvent, FormEvent, useState } from 'react';
import LoginBG from './components/LoginBG';
import { useNavigate } from 'react-router-dom';
import Button from '../Common/components/Button';
import { useMutation } from '@tanstack/react-query';
import { login } from './services';

const Login = () => {
  const navigation = useNavigate();
  const [formValues, setFormValues] = useState<ILoginValue>({
    username: '',
    password: '',
  });

  const onchange = (e: ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.currentTarget;
    setFormValues({
      ...formValues,
      [id]: value,
    });
  };

  const onLogin = useMutation({
    mutationFn: login,
    onSuccess: (data) => {
      sessionStorage.setItem('token', data.result.accessToken);
      navigation('/home');
      window.location.reload();
    },
    onError: (error) => {
      console.log('에러 발생! 아래 메시지를 확인해주세요.', error);
    },
  });

  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const { username, password } = formValues;
    if (!username || !password) {
      alert('아이디 또는 비밀번호가 존재하지 않습니다.');
      return;
    } else {
      onLogin.mutate(formValues);
    }
  };

  return (
    <StContainer>
      <StWrapper>
        <StIntroSection>
          <StIntro>
            <h1>계약의 확실성과</h1>
            <h1>단순함을 한번에</h1>
          </StIntro>
          <div>
            <LogoBig />
          </div>
        </StIntroSection>
        <StLoginForm onSubmit={onSubmit}>
          <StLogin>Login</StLogin>
          <StInputBox>
            <label htmlFor="username" />
            <StInput
              id="username"
              placeholder="username"
              value={formValues.username}
              onChange={onchange}
            />
          </StInputBox>
          <StInputBox>
            <label htmlFor="password" />
            <StInput
              id="password"
              placeholder="password"
              value={formValues.password}
              onChange={onchange}
            />
          </StInputBox>
          <Button content="login" />
        </StLoginForm>
        <LoginBG />
      </StWrapper>
    </StContainer>
  );
};

export default Login;

const StContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;

  width: 100vw;
  height: 100vh;
`;

const StWrapper = styled.div`
  display: flex;
  gap: 12rem;
`;

const StIntroSection = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4rem;
`;

const StIntro = styled.div`
  font-size: 3.2rem;
  font-weight: 500;
  font-style: normal;
  line-height: normal;
  color: #000;
  text-align: right;
`;

const StLoginForm = styled.form`
  display: flex;
  flex-direction: column;
  gap: 1em;
  width: 35rem;
`;

const StLogin = styled.p`
  margin-bottom: 1rem;
  font-size: 2rem;
  font-weight: 200;
`;

const StInputBox = styled.div`
  width: 100%;
`;

const StInput = styled.input`
  width: 100%;
  padding: 0.5rem 0.5rem 1rem;

  font-size: 1.8rem;
  font-weight: 100;

  background: transparent;
  border: none;
  border-bottom: 1px solid black;

  &:focus {
    border-color: ${({ theme }) => theme.colors.mint};
    outline: none;
  }

  &::placeholder {
    font-weight: 200;
    color: #ccc;
  }
`;
