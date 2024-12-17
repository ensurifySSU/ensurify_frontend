import styled from '@emotion/styled';

interface IButtonProps {
  width?: string;
  content: string;
  isActive?: boolean;
  handleClick?: () => void;
}

const Button = ({ width, content, isActive = true, handleClick }: IButtonProps) => {
  return (
    <StBtn width={width} isActive={isActive} onClick={handleClick}>
      {content}
    </StBtn>
  );
};

export default Button;

const StBtn = styled.button<{ width: string | undefined; isActive: boolean }>`
  width: ${({ width }) => width || '100%'};
  height: fit-content;
  padding: 1rem 0;

  font-size: 1.8rem;
  color: #fff;

  background: ${({ isActive }) =>
    isActive ? 'linear-gradient(91deg, #04cba4 0%, #04a585 100%)' : '#ccc'};
  border-radius: 5px;

  &:hover {
    background: linear-gradient(91deg, #04a585 0%, #04cba4 100%);
  }
`;
