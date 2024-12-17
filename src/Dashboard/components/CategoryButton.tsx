import styled from '@emotion/styled';

const CategoryButton = ({ content }: { content: string }) => {
  return <StContainer isActive={false}>{content}</StContainer>;
};

export default CategoryButton;

const StContainer = styled.button<{ isActive: boolean }>`
  width: fit-content;
  height: 3rem;
  padding: 0 1rem;

  font-size: 1.4rem;
  font-weight: 500;
  color: white;

  background-color: ${({ isActive, theme }) => (isActive ? theme.colors.mint : '#ccc')};
  border-radius: 10px;

  &:hover {
    background-color: ${({ theme }) => theme.colors.mint};
  }
`;
