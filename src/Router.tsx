import { createBrowserRouter } from 'react-router-dom';
import Login from './Login/Login';
import Home from './Home/Home';
import MainLayout from './Common/components/Layout/MainLayout';
import Dashboard from './Dashboard/Dashboard';
import CreateRoom from './CreateRoom/CreateRoom';
import { Tmp } from './Contract/ContractRoom';
import Connecting from './Contract/components/Connecting/Connecting';
import WebRtc from './Contract/components/WebRTC/WebRtc';

const router = createBrowserRouter([
  {
    path: '/',
    element: <MainLayout />,
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
        element: <Tmp />,
      },
      {
        path: '/webRTC',
        element: <WebRtc />,
      },
    ],
  },
  {
    path: '/login',
    element: <Login />,
  },
]);

export default router;
