import { Global, ThemeProvider } from '@emotion/react';
import globalStyles from './Common/styles/globalStyles';
import { RouterProvider } from 'react-router-dom';
import router from './Router';
import { theme } from './Common/styles/theme';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider theme={theme}>
        <Global styles={globalStyles} />
        <RouterProvider router={router} />
      </ThemeProvider>
    </QueryClientProvider>
  );
}

export default App;
