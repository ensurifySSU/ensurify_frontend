import styled from "@emotion/styled";

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
  color: #999999;
`;
export const Txt14 = styled.span`
  font-size: 0.875rem; /* 14px */
  line-height: 1.25rem; /* 20px */
`;
export const Txt14Gray = styled.span`
  font-size: 0.875rem; /* 14px */
  line-height: 1.25rem; /* 20px */
  color: #999999;
`;
export const Txt14Bold = styled.span`
  font-size: 0.875rem; /* 14px */
  line-height: 1.25rem; /* 20px */
  font-weight: 500;
`;
export const Txt16 = styled.span`
  font-size: 1rem; /* 16px */
  line-height: 1.5rem; /* 24px */
`;
export const Txt16Bold = styled.span`
  font-size: 1rem; /* 16px */
  line-height: 1.5rem; /* 24px */
  font-size: 16px;
`;
export const Txt18 = styled.span`
  font-size: 1.125rem; /* 18px */
  line-height: 1.75rem; /* 28px */
`;
export const Txt18Bold = styled.span`
  font-weight: 500;
  font-size: 1.125rem; /* 18px */
  line-height: 1.75rem; /* 28px */
`;

export const Txt20 = styled.span`
  font-size: 1.25rem; /* 20px */
  line-height: 1.75rem; /* 28px */
`;
export const Txt20Bold = styled.span`
  font-weight: 500;
  font-size: 1.25rem; /* 20px */
  line-height: 1.75rem; /* 28px */
`;

export const FlexContainer = styled.div<StyleProps>`
  display: flex;
  flex-direction: ${(props) => props.flexDirection || "column"};
  align-items: ${(props) => props.alginItems || "center"};
  justify-content: ${(props) => props.justifyContent || "justify-content"};
  width: ${(props) => props.width || "fit-content"};
  height: ${(props) => props.height || "fit-content"};
  max-width: ${(props) => props.maxWidth || ""};
  max-height: ${(props) => props.maxHeight || ""};
  min-width: ${(props) => props.minWidth || ""};
  min-height: ${(props) => props.minHeight || ""};
  padding: ${(props) => props.padding || ""};
  margin: ${(props) => props.margin || ""};
  margin-bottom: ${(props) => props.marginBottom || ""};
`;

export const FlexCenterContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
`;

export const MainBody = styled(FlexContainer)`
  align-items: flex-start;
  border-bottom: 1px solid #eeeeee;
`;

export const MainBodyInnerLeft = styled(FlexContainer)`
  padding: 0px;
  min-height: 500px;
  align-items: flex-start;
  flex-direction: column;
  justify-content: flex-start;
  border-right: 1px solid #eeeeee;
`;

export const MainBodyInnerRight = styled(FlexContainer)`
  padding: 0px;
  width: 310px;
  min-width: 310px;
  min-height: 500px;
  height: 100%;
  align-items: flex-start;
  justify-content: flex-start;

  flex-direction: column;
`;

export const MainBodyCell = styled(FlexContainer)`
  padding: 30px;
  width: 100%;
  border-bottom: 1px solid #eeeeee;
  align-items: flex-start;
  flex-direction: column;
`;

export const MainBodyFormContent = styled(FlexContainer)`
  flex-direction: row;
  width: 100%;
  justify-content: flex-start;
`;

export const FormContentLeft = styled(FlexContainer)`
  width: 200px;
  align-items: flex-start;
  justify-content: flex-start;
`;

export const FormContentRight = styled(FlexContainer)`
  align-items: flex-end;
  width: 100%;
  justify-content: flex-start;
  flex-direction: column;
  flex: 1;
`;

export const LineEEE = styled.div`
  height: 1px;
  background-color: #eeeeee;
  width: 100%;
  margin-top: 16px;
  margin-bottom: 16px;
`;

export const BlueBtn = styled.button`
  width: 100px;
  height: 70px;
  background-color: #2563eb;
  color: #ffffff;
  border: none;
  border-radius: 20px;
`;
export const StyledAIButton = styled.button`
  border: none;
  background: none;
  cursor: pointer;
  padding: 0;

  img {
    width: 100px;
    height: 100px;
  }
`;

export const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: flex-end;
  align-items: flex-end;
`;

export const ModalContent = styled.div`
  background: white;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
`;

export const CloseButton = styled.button`
  position: absolute;
  top: 10px;
  right: 10px;
  background: none;
  border: none;
  cursor: pointer;
  font-size: 16px;
`;

export const TextButton = styled.a`
  position: fixed;
  bottom: 20px;
  left: 20px;
  border: 1px solid #000;
  background: white;
  color: black;
  padding: 10px 20px;
  border-radius: 20px;
  text-decoration: none;
  font-weight: bold;
  cursor: pointer;
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
  border: 1px solid #ccc;
  border-radius: 4px;
  font-size: 14px;
`;

export const ModalFooter = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;


// Styled Components
export const Container = styled.div`
  position: relative;
  width: 300px;
  height: 300px;
  background-color: #fff8e6; /* 부드러운 배경색 */
  border-radius: 16px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 16px;
`;

export const InfoButton = styled.button`
  position: absolute;
  bottom: 16px;
  left: 16px;
  background-color: white;
  color: black;
  font-weight: bold;
  border: none;
  border-radius: 20px;
  padding: 8px 16px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  cursor: pointer;

  &:hover {
    background-color: #f0f0f0;
  }
`;

export const FloatingAIButton = styled.div`
  position: absolute;
  bottom: 16px;
  right: 16px;
`;