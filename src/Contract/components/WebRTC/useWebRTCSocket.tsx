import { useEffect, useState } from 'react';

const useWebRTCSocket = () => {
  const [signaling, setSignaling] = useState<WebSocket | null>(null);
  const [sessionId, setSessionId] = useState<String | null>(null);
  useEffect(() => {
    const ws = new WebSocket(`${import.meta.env.VITE_WSS_URL}/signal`);

    ws.onopen = () => {
      console.log('WebSocket 연결 성공!');
    };

    setSignaling(ws);

    ws.onmessage = async (event) => {
      const { sessionId } = JSON.parse(event.data);
      setSessionId(sessionId);
    };

    return () => {
      ws.close();
    };
  }, []);
  return { signaling, sessionId };
};

export default useWebRTCSocket;
