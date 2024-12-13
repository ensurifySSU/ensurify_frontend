import styled from '@emotion/styled';
import { RightSideSheetWidth } from '../../Common/constants/SIZES';

const SideSheet = () => {
  return <StSideSheet.container></StSideSheet.container>;
};

export default SideSheet;

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
