import styled from '@emotion/styled';
import { RightSideSheetWidth } from '../constants/SIZES';

export const RightSideSheet = styled.aside`
  position: fixed;
  top: 6rem;
  right: 0;

  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;

  width: ${RightSideSheetWidth}rem;
  height: calc(100vh - 6rem);
  padding: 2rem;

  background-color: white;
`;

export const LeftPrimarySection = styled.div`
  display: flex;
  align-items: baseline;
  justify-content: space-between;

  width: calc(100% - ${RightSideSheetWidth}rem);
  height: 100%;
  padding: 2rem;
`;
