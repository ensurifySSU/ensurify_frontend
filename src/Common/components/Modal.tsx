import { CloseButton, ModalContent, ModalOverlay, TextButton } from '../common';

interface ModalProps {
  isActive: boolean;
  onClose: () => void;
}

const Modal: React.FC<ModalProps> = ({ isActive, onClose }) => {
  if (!isActive) return null;

  return (
    <ModalOverlay onClick={onClose}>
      <ModalContent onClick={(e) => e.stopPropagation()}>
        <p>This is a modal content!</p>
        <CloseButton onClick={onClose}>Close</CloseButton>
        <TextButton onClick={onClose}>irp란?</TextButton>
      </ModalContent>
    </ModalOverlay>
  );
};

export default Modal;
