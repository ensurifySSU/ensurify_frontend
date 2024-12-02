import styled from '@emotion/styled';
import { RightSideSheetWidth } from '../Common/constants/SIZES';
import { IcSearch } from './assets/0_index';
import SearchItem from './components/SearchItem';
import Button from '../Common/components/Button';

const Input = ({ placeholder }: { placeholder: string }) => {
  return (
    <StInput.container>
      <StInput.input placeholder={placeholder} />
      <IcSearch />
    </StInput.container>
  );
};

const CreateRoom = () => {
  return (
    <StContainer>
      <StSideSheet.container>
        <StSideSheet.box>
          <StSideSheet.label>계약 상품</StSideSheet.label>
        </StSideSheet.box>
        <StSideSheet.box>
          <StSideSheet.label>계약 정보</StSideSheet.label>
        </StSideSheet.box>
        <Button width="70%" content="새 계약 생성하기" isActive={false} />
      </StSideSheet.container>
      <StSection>
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
      </StSection>
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
    justify-content: space-between;

    width: ${RightSideSheetWidth}rem;
    height: calc(100% - 6rem);
    padding: 5rem;

    background-color: white;
  `,
  box: styled.div`
    position: relative;
    display: flex;
    flex-direction: column;
    width: 100%;
  `,
  label: styled.p`
    font-size: 2rem;
    font-weight: 700;
    color: #000;
  `,
};

const StSection = styled.div`
  display: flex;
  align-items: baseline;
  justify-content: space-between;

  width: calc(100% - ${RightSideSheetWidth}rem);
  height: 100%;
  padding: 2rem;
`;

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
