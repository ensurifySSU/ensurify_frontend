import React, { useEffect, useState } from 'react';
import {
  ChatInput,
  ChatInputWrapper,
  CloseButton,
  Container,
  FloatingAIButton,
  InfoButton,
  ModalContent,
  ModalFooter,
  ModalOverlay,
  TextButton,
} from '../common';
import AIButton from './AIButton';
import { useMutation } from '@tanstack/react-query';
import { postAI } from '../apis/servies';

interface ModalProps {
  isActive: boolean;
  onClose: () => void;
}

const Modal: React.FC<ModalProps> = ({ isActive, onClose }) => {
  const [input, setInput] = useState('');

  const onAIMessage = useMutation({
    mutationFn: postAI,
    onSuccess: (data) => {
      console.log(data);
    },
    onError: (error) => {
      console.log('에러 발생! 아래 메시지를 확인해주세요.', error);
    },
  });

  const handleAI = async () => {
    if (!input) {
      alert('메시지를 입력해주세요.');
      return;
    }
    onAIMessage.mutate(input);
    setInput('');
  }

  // ESC 키 이벤트 처리
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
      if (e.key === 'enter') handleAI();
    };

    if (isActive) {
      document.addEventListener('keydown', handleKeyDown);
    }

    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [isActive, onClose]);

  if (!isActive) return null;
  
  return (
    <ModalOverlay onClick={onClose}>
      <Container onClick={(e) => e.stopPropagation()}>
        <InfoButton onClick={() => alert('irp란?')}>irp란?</InfoButton>
        <ChatInput
          placeholder="메시지를 입력하세요..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
        />
        <FloatingAIButton>
          <AIButton onClick={onClose} isActive={isActive} />
        </FloatingAIButton>
      </Container>
    </ModalOverlay>
  );
};

export default Modal;
