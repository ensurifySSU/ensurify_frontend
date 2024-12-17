import { useState } from 'react';
import AIButton from './AIButton';
import Modal from './Modal';

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
      <AIButton onClick={handleOpenModal} isActive={isModalActive} />
      <Modal isActive={isModalActive} onClose={handleCloseModal} />
    </>
  );
};

export default AIArea;
