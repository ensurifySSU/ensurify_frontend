import styled from '@emotion/styled';
import { LogoBig } from '../Common/assets/0_index';
import { ILoginValue } from './types/loginTypes';
import { ChangeEvent, FormEvent, useState } from 'react';
import LoginBG from './components/LoginBG';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const navigation = useNavigate();
  const [formValues, setFormValues] = useState<ILoginValue>({
    username: '',
    password: '',
  });

  const onchange = (e: ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.currentTarget;
    console.log(id, value);
    setFormValues({
      ...formValues,
      [id]: value,
    });
  };

  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const { username, password } = formValues;
    if (!username || !password) {
      alert('아이디 또는 비밀번호가 존재하지 않습니다.');
      return;
    }

    try {
      console.log(username, password);
      //서버 요청
      navigation('/home');
    } catch {
      alert('로그인에 실패하였습니다.');
    }
  };

  return (
    <StContainer>
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
        <StButton>로그인</StButton>
      </StLoginForm>
      <LoginBG />
    </StContainer>
  );
};

export default Login;

const StContainer = styled.div`
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

const StButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;

  margin-top: 5rem;
  padding: 1rem 0;

  color: #fff;

  background-color: ${({ theme }) => theme.colors.mint};
`;
