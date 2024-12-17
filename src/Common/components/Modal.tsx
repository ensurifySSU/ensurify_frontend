import React, { useEffect, useState } from 'react';
import {
  AnswerText,
  ChatInput,
  ChatInputWrapper,
  CloseButton,
  Container,
  FloatingAIButton,
  InfoButton,
  InfoListContainer,
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
  userType: string;
}

const Modal: React.FC<ModalProps> = ({ isActive, onClose, userType }) => {
  const [input, setInput] = useState('');
  const [answer, setAnswer] = useState('');
  const [status, setStatus] = useState(false);
  const [infoList, setInfoList] = useState<string[]>(['irp란?', '감자야']);

  const onAIMessage = useMutation({
    mutationFn: postAI,
    onSuccess: (data) => {
      console.log(data);
      setAnswer(data.result.answer);
      setStatus(data.isSuccess);
    },
    onError: (error) => {
      console.log('에러 발생! 아래 메시지를 확인해주세요.', error);
    },
  });

  const handleAI = async () => {
    // if (!input) {
    //   alert('메시지를 입력해주세요.');
    //   return;
    // }
    onAIMessage.mutate({ question: input, tokenType: userType });
    setInput('');
  };

  const onClickAIQuestion = (question: string) => {
    onAIMessage.mutate({ question: question, tokenType: userType });
  };

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
      if (e.key === 'Enter') handleAI(); // Enter 키 감지
    };

    if (isActive) {
      document.addEventListener('keydown', handleKeyDown);
    }

    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [isActive, onClose]);

  useEffect(() => {
    console.log(input);
  }, [input]);

  return (
    <ModalOverlay onClick={onClose}>
      <Container onClick={(e) => e.stopPropagation()}>
        <InfoListContainer>
          {infoList &&
            infoList.map((item) => (
              <InfoButton onClick={() => onClickAIQuestion(item)}>{item}</InfoButton>
            ))}
        </InfoListContainer>
        <ChatInput
          placeholder="메시지를 입력하세요..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
        />
        {answer && <AnswerText>{answer}</AnswerText>}
      </Container>
      <FloatingAIButton>
        <AIButton onClick={onClose} isActive={isActive} />
      </FloatingAIButton>
    </ModalOverlay>
  );
};

export default Modal;
