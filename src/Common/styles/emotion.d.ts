import '@emotion/react';
import { ColorsTypes } from './theme';

declare module '@emotion/react' {
  export interface Theme {
    colors: ColorsTypes;
  }
}
