import { createBrowserRouter } from 'react-router-dom';
import Login from './Login/Login';

const router = createBrowserRouter([
  {
    path: '/',
    element: <></>,
  },
  {
    path: '/login',
    element: <Login />,
  },
]);

export default router;
