import { createBrowserRouter } from 'react-router-dom';
import WebRTCComponent from './WebRTC';

const router = createBrowserRouter([
  {
    path: '/',
    element: <WebRTCComponent />,
  },
]);

export default router;
