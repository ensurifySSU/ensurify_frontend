import styled from '@emotion/styled';

interface StyleProps {
  width?: string;
  height?: string;
  maxWidth?: string;
  maxHeight?: string;
  minWidth?: string;
  minHeight?: string;
  padding?: string;
  margin?: string;
  alginItems?: string;
  justifyContent?: string;
  flexDirection?: string;
  marginBottom?: string;
}

export const Txt12 = styled.span`
  font-size: 0.75rem; /* 12px */
  line-height: 1rem; /* 16px */
`;
export const Txt12Gray = styled.span`
  font-size: 0.75rem; /* 12px */
  line-height: 1rem; /* 16px */
  color: #999;
`;
export const Txt14 = styled.span`
  font-size: 0.875rem; /* 14px */
  line-height: 1.25rem; /* 20px */
`;
export const Txt14Gray = styled.span`
  font-size: 0.875rem; /* 14px */
  line-height: 1.25rem; /* 20px */
  color: #999;
`;
export const Txt14Bold = styled.span`
  font-size: 0.875rem; /* 14px */
  font-weight: 500;
  line-height: 1.25rem; /* 20px */
`;
export const Txt16 = styled.span`
  font-size: 1rem; /* 16px */
  line-height: 1.5rem; /* 24px */
`;
export const Txt16Bold = styled.span`
  font-size: 1rem; /* 16px */
  font-size: 16px;
  line-height: 1.5rem; /* 24px */
`;
export const Txt18 = styled.span`
  font-size: 1.125rem; /* 18px */
  line-height: 1.75rem; /* 28px */
`;
export const Txt18Bold = styled.span`
  font-size: 1.125rem; /* 18px */
  font-weight: 500;
  line-height: 1.75rem; /* 28px */
`;

export const Txt20 = styled.span`
  font-size: 1.25rem; /* 20px */
  line-height: 1.75rem; /* 28px */
`;
export const Txt20Bold = styled.span`
  font-size: 1.25rem; /* 20px */
  font-weight: 500;
  line-height: 1.75rem; /* 28px */
`;

export const FlexContainer = styled.div<StyleProps>`
  display: flex;
  flex-direction: ${(props) => props.flexDirection || 'column'};
  align-items: ${(props) => props.alginItems || 'center'};
  justify-content: ${(props) => props.justifyContent || 'justify-content'};

  width: ${(props) => props.width || 'fit-content'};
  min-width: ${(props) => props.minWidth || ''};
  max-width: ${(props) => props.maxWidth || ''};
  height: ${(props) => props.height || 'fit-content'};
  min-height: ${(props) => props.minHeight || ''};
  max-height: ${(props) => props.maxHeight || ''};
  margin: ${(props) => props.margin || ''};
  margin-bottom: ${(props) => props.marginBottom || ''};
  padding: ${(props) => props.padding || ''};
`;

export const FlexCenterContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

export const MainBody = styled(FlexContainer)`
  align-items: flex-start;
  border-bottom: 1px solid #eee;
`;

export const MainBodyInnerLeft = styled(FlexContainer)`
  flex-direction: column;
  align-items: flex-start;
  justify-content: flex-start;

  min-height: 500px;
  padding: 0;

  border-right: 1px solid #eee;
`;

export const MainBodyInnerRight = styled(FlexContainer)`
  flex-direction: column;
  align-items: flex-start;
  justify-content: flex-start;

  width: 310px;
  min-width: 310px;
  height: 100%;
  min-height: 500px;
  padding: 0;
`;

export const MainBodyCell = styled(FlexContainer)`
  flex-direction: column;
  align-items: flex-start;

  width: 100%;
  padding: 30px;

  border-bottom: 1px solid #eee;
`;

export const MainBodyFormContent = styled(FlexContainer)`
  flex-direction: row;
  justify-content: flex-start;
  width: 100%;
`;

export const FormContentLeft = styled(FlexContainer)`
  align-items: flex-start;
  justify-content: flex-start;
  width: 200px;
`;

export const FormContentRight = styled(FlexContainer)`
  flex: 1;
  flex-direction: column;
  align-items: flex-end;
  justify-content: flex-start;

  width: 100%;
`;

export const LineEEE = styled.div`
  width: 100%;
  height: 1px;
  margin-top: 16px;
  margin-bottom: 16px;

  background-color: #eee;
`;

export const BlueBtn = styled.button`
  padding: 1rem 2rem;

  color: #fff;

  background-color: ${({ theme }) => theme.colors.blue};
  border: none;
  border-radius: 5px;
`;
export const StyledAIButton = styled.button`
  cursor: pointer;
  padding: 0;
  background: none;
  border: none;

  img {
    width: 100px;
    height: 100px;
  }
`;

export const ModalOverlay = styled.div`
  position: fixed;
  inset: 0;

  display: flex;
  align-items: flex-end;
  justify-content: flex-end;

  background: rgb(0 0 0 / 50%);
`;

export const ModalContent = styled.div`
  padding: 20px;
  background: white;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgb(0 0 0 / 10%);
`;

export const CloseButton = styled.button`
  cursor: pointer;

  position: absolute;
  top: 10px;
  right: 10px;

  font-size: 16px;

  background: none;
  border: none;
`;

export const TextButton = styled.a`
  cursor: pointer;

  position: fixed;
  bottom: 20px;
  left: 20px;

  padding: 10px 20px;

  font-weight: bold;
  color: black;
  text-decoration: none;

  background: white;
  border: 1px solid #000;
  border-radius: 20px;
`;

// Styled Components
export const ChatInputWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

export const ChatInput = styled.input`
  width: 100%;
  padding: 10px;

  font-size: 14px;

  border: 1px solid #ccc;
  border-radius: 4px;
`;

export const ModalFooter = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

// Styled Components
export const Container = styled.div`
  position: relative;

  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;

  width: 300px;
  height: 400px;
  padding: 16px;

  background-color: #fff8e6; /* 부드러운 배경색 */
  border-radius: 16px;
  box-shadow: 0 4px 6px rgb(0 0 0 / 10%);
`;

export const InfoButton = styled.button`
  cursor: pointer;

  padding: 8px 16px;

  font-weight: bold;
  color: black;

  background-color: white;
  border: none;
  border-radius: 20px;
  box-shadow: 0 2px 4px rgb(0 0 0 / 10%);

  &:hover {
    background-color: #f0f0f0;
  }
`;

export const FloatingAIButton = styled.div`
  position: absolute;
  right: 16px;
  bottom: 16px;
`;

export const AnswerText = styled.p`
  overflow-y: auto;

  max-height: 150px; /* 긴 답변에 대한 스크롤 처리 */
  margin: 12px 0;
  padding: 12px;

  font-size: 14px;
  line-height: 1.5;
  color: #333;

  background-color: #f9f9f9; /* 부드러운 배경색 */
  border: 1px solid #e0e0e0; /* 테두리 추가 */
  border-radius: 8px;
  box-shadow: 0 2px 4px rgb(0 0 0 / 10%);
`;

export const InfoListContainer = styled.div`
  position: absolute;
  z-index: 10;
  bottom: 16px;
  left: 16px;

  overflow-y: auto; /* 버튼 수가 많으면 스크롤 */
  display: flex;
  flex-direction: column;
  gap: 8px;

  max-height: 150px;
`;
