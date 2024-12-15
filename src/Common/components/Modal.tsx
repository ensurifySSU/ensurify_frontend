import { useState } from 'react';
import { CloseButton, ModalContent, ModalOverlay, TextButton } from '../common';
import AIButton from './AIButton';

interface ModalProps {}

const Modal: React.FC<ModalProps> = () => {
  const [isActive, setIsActive] = useState<boolean>(false);

  const handleClick = () => {
    setIsActive((prev) => !prev);
  };

  return (
    <>
      <AIButton onClick={handleClick} isActive={isActive} />
      {isActive && (
        <ModalOverlay onClick={() => setIsActive(false)}>
          <ModalContent onClick={(e) => e.stopPropagation()}>
            <p>This is a modal content!</p>
            <CloseButton onClick={() => setIsActive(false)}>Close</CloseButton>
          </ModalContent>
          <TextButton onClick={handleClick}>irp란?</TextButton>
        </ModalOverlay>
      )}
    </>
  );
};

export default Modal;
