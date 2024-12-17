import { createBrowserRouter } from 'react-router-dom';
import Login from './Login/Login';
import Home from './Home/Home';
import MainLayout from './Common/components/Layout/MainLayout';
import Dashboard from './Dashboard/Dashboard';
import CreateRoom from './CreateRoom/CreateRoom';
import ContractRoom from './Contract/ContractRoom';
import Connecting from './Contract/components/Connecting/Connecting';
import PDF from './Common/components/PDF';

const router = createBrowserRouter([
  {
    path: '/',
    // element: <MainLayout />,
    element: <PDF />,
    children: [
      {
        path: '/home',
        element: <Home />,
      },
      {
        path: '/dashboard',
        element: <Dashboard />,
      },
      {
        path: '/createRoom',
        element: <CreateRoom />,
      },
      {
        path: '/connecting/:roomId/:clientId',
        element: <Connecting />,
      },
      {
        path: '/contract/:roomId/:clientId',
        element: <ContractRoom />,
      },
    ],
  },
  {
    path: '/login',
    element: <Login />,
  },
]);

export default router;
