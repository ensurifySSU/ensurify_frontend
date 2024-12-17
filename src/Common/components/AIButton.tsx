import { useState } from 'react';
import styled from '@emotion/styled';
import Icon_waiting from '../assets/waitingAI.svg';
import Icon_active from '../assets/activeAI.svg';
import { FloatingAIButton, StyledAIButton } from '../common';

interface Props {
  onClick: () => void;
  isActive: boolean;
}

const AIButton = ({ onClick, isActive }: Props) => {
  return (
    <StyledAIButton onClick={onClick}>
      <img src={isActive ? Icon_active : Icon_waiting} alt="button content" />
    </StyledAIButton>
  );
};

export default AIButton;
