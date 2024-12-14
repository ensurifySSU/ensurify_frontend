import styled from '@emotion/styled';
import { RightSideSheetWidth } from '../Common/constants/SIZES';
import { IcSearch } from './assets/0_index';
import SearchItem from './components/SearchItem';
import Button from '../Common/components/Button';
import { LeftPrimarySection, RightSideSheet } from '../Common/styles/commonStyles';

const Input = ({ placeholder }: { placeholder: string }) => {
  return (
    <StInput.container>
      <StInput.input placeholder={placeholder} />
      <IcSearch />
    </StInput.container>
  );
};

const 계약상품 = () => {
  return (
    <StSeletedContaienr>
      <St계약상품.title>개인형 퇴직 어쩌고저쩌고어쩌고저쩌고</St계약상품.title>
      <St계약상품.tag>카테고리</St계약상품.tag>
    </StSeletedContaienr>
  );
};

const 고객정보 = () => {
  return (
    <StSeletedContaienr>
      <St고객정보.wrapper>
        <St고객정보.name>오유은</St고객정보.name>
        <St고객정보.userInfo>남 | 25</St고객정보.userInfo>
        <br />
        <St고객정보.label>링크 전송 이메일</St고객정보.label>
        <St고객정보.email>email@naver.com</St고객정보.email>
      </St고객정보.wrapper>
    </StSeletedContaienr>
  );
};

const CreateRoom = () => {
  return (
    <StContainer>
      <LeftPrimarySection>
        <SelectableBox.container>
          <SelectableBox.label>계약 선택</SelectableBox.label>
          <Input placeholder="계약명을 검색하세요" />
          <SearchItem title="계약명계약명계약명계약명계약명계약명계약명" tag="카테고리" />
        </SelectableBox.container>
        <SelectableBox.container>
          <SelectableBox.label>고객 선택</SelectableBox.label>
          <Input placeholder="고객명을 검색하세요" />
          <SearchItem title="오유은" tag="이메일" />
        </SelectableBox.container>
      </LeftPrimarySection>
      <RightSideSheet>
        <StSideSheet.box>
          <StSideSheet.label>계약 상품</StSideSheet.label>
          <계약상품 />
        </StSideSheet.box>
        <StSideSheet.box>
          <StSideSheet.label>고객 정보</StSideSheet.label>
          <고객정보 />
        </StSideSheet.box>
        <Button width="70%" content="새 계약 생성하기" isActive={false} handleClick={() => {}} />
      </RightSideSheet>
    </StContainer>
  );
};

export default CreateRoom;

const StContainer = styled.div`
  height: 100%;
`;

const StSideSheet = {
  container: styled.aside`
    position: fixed;
    top: 6rem;
    right: 0;

    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-around;

    width: ${RightSideSheetWidth}rem;
    height: calc(100% - 6rem);
    padding: 5rem;

    background-color: white;
  `,
  box: styled.div`
    position: relative;

    display: flex;
    flex-direction: column;
    gap: 2rem;

    width: 100%;
    height: 40%;
  `,
  label: styled.p`
    font-size: 2rem;
    font-weight: 700;
    color: #000;
  `,
};

const SelectableBox = {
  container: styled.div`
    display: flex;
    flex-direction: column;
    gap: 2rem;

    width: 49%;
    height: 100%;
    padding: 2rem;

    background-color: white;
    border-radius: 10px;
  `,
  label: styled.p`
    font-size: 1.8rem;
    font-weight: 700;
    color: #000;
  `,
};

const StInput = {
  container: styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;

    width: 100%;
    height: 5rem;
    padding: 0 1rem;

    border: 1px solid #aeaeae;
    border-radius: 3px;
  `,
  input: styled.input`
    width: 90%;
    height: 100%;

    background-color: transparent;
    border: none;
    outline: none;
  `,
};

const StSeletedContaienr = styled.div`
  display: flex;
  gap: 1rem;
  align-items: end;

  width: 100%;
  height: fit-content;
  padding: 2rem;

  background-color: rgb(255 215 85 / 20%);
  border-radius: 10px;
`;

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
