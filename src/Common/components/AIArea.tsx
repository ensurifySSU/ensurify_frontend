import { useState } from 'react';
import AIButton from './AIButton';
import Modal from './Modal';
import { Container, FloatingAIButton, InfoButton } from '../common';

const AIArea = () => {
  const [isModalActive, setIsModalActive] = useState(false);

  const handleOpenModal = () => {
    setIsModalActive(true);
  };

  const handleCloseModal = () => {
    setIsModalActive(false);
  };

  return (
    <>
      <FloatingAIButton>
        <AIButton onClick={handleOpenModal} isActive={isModalActive} />
      </FloatingAIButton>
      <Modal isActive={isModalActive} onClose={handleCloseModal} />
    </>
  );
};

export default AIArea;
