import styled from '@emotion/styled';

interface IButtonProps {
  width?: number;
  content: string;
  isActive?: boolean;
}

const Button = ({ width, content, isActive }: IButtonProps) => {
  return <StBtn width={width}>{content}</StBtn>;
};

export default Button;

const StBtn = styled.button<{ width: number | undefined }>`
  width: ${({ width }) => width || '100%'};
  height: fit-content;
  padding: 1rem 0;

  font-size: 1.8rem;
  color: #fff;

  background: linear-gradient(91deg, #04cba4 0%, #04a585 100%);
  border-radius: 5px;

  &:hover {
    background: linear-gradient(91deg, #04a585 0%, #04cba4 100%);
  }
`;
