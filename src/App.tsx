import { Global, ThemeProvider } from '@emotion/react';
import globalStyles from './Common/styles/globalStyles';
import { RouterProvider } from 'react-router-dom';
import router from './Router';
import { theme } from './Common/styles/theme';

function App() {
  return (
    <ThemeProvider theme={theme}>
      <Global styles={globalStyles} />
      <RouterProvider router={router} />
    </ThemeProvider>
  );
}

export default App;
