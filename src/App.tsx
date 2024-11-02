import { Global, ThemeContext, ThemeProvider } from '@emotion/react';
import globalStyles from './COMMON/styles/globalStyles';
import { RouterProvider } from 'react-router-dom';
import router from './Router';

function App() {
  return (
    <ThemeProvider theme={ThemeContext}>
      <Global styles={globalStyles} />
      <RouterProvider router={router} />
    </ThemeProvider>
  );
}

export default App;
