import { Global, ThemeContext, ThemeProvider } from '@emotion/react';
import globalStyles from './COMMON/styles/globalStyles';

function App() {
  return (
    <ThemeProvider theme={ThemeContext}>
      <Global styles={globalStyles} />
    </ThemeProvider>
  );
}

export default App;
