import styled from '@emotion/styled';
import { IClientInfoType } from '../../CreateRoom/types/createRoomTypes';

export const ClientInfoCard = ({ data }: { data: IClientInfoType }) => {
  const { name, gender, age, email } = data;
  return (
    <StSeletedContaienr>
      <St고객정보.wrapper>
        <St고객정보.name>{name}</St고객정보.name>
        <St고객정보.userInfo>
          {gender} | {age}
        </St고객정보.userInfo>
        <br />
        <St고객정보.label>링크 전송 이메일</St고객정보.label>
        <St고객정보.email>{email}</St고객정보.email>
      </St고객정보.wrapper>
    </StSeletedContaienr>
  );
};

export const BasicInfoCard = (name: string, category: string) => {
  return (
    <StSeletedContaienr>
      <St계약상품.title>{name}</St계약상품.title>
      <St계약상품.tag>{category}</St계약상품.tag>
    </StSeletedContaienr>
  );
};

const StSeletedContaienr = styled.div`
  display: flex;
  gap: 1rem;
  align-items: end;

  width: 100%;
  height: fit-content;
  padding: 2rem;

  font-size: 1.3rem;

  background-color: rgb(255 215 85 / 20%);
  border-radius: 10px;
`;

const St고객정보 = {
  wrapper: styled.div`
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
  `,
  name: styled.p`
    overflow: hidden;
    font-size: 2rem;
    font-weight: 600;
    color: #000;
  `,
  userInfo: styled.p`
    font-size: 1.4rem;
  `,
  label: styled.p`
    font-size: 1.3rem;
    color: #5c5c5c;
  `,
  email: styled.p`
    font-size: 1.6rem;
    font-weight: 500;
    color: #000;
    white-space: nowrap;
  `,
};

const St계약상품 = {
  title: styled.p`
    overflow: hidden;
    font-size: 2rem;
    font-weight: 600;
    color: #000;
  `,
  tag: styled.p`
    font-size: 1.2rem;
    font-weight: 400;
    color: ${({ theme }) => theme.colors.blue};
    white-space: nowrap;
  `,
};
