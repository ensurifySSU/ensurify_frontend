//theme 설정
//사용법
// ${({ theme }) => theme.colors.mint}; (Scpt snippets 사용)

import { Theme } from '@emotion/react';

const colors = {
  mint: '#04CBA4',
  blut: '#4077C9',
  yellow: '#FFD755',
};

export type ColorsTypes = typeof colors;

export const theme: Theme = {
  colors,
};
