import { useNavigate, useParams } from 'react-router-dom';
import Contract from './components/Contract/Contract';
import Identification from './components/Identification/Identification';
import { useEffect, useState } from 'react';
import { useRoleStore } from '../Common/stores/roleStore';
import useWebRTCSocket from './components/WebRTC/useWebRTCSocket';
import useWebRTC from './components/WebRTC/useWebRTC';
import { Client } from '@stomp/stompjs';

export const Tmp = () => {
  const { signaling, sessionId } = useWebRTCSocket();
  return (
    <>{signaling && sessionId && <ContractRoom signaling={signaling} sessionId={sessionId} />}</>
  );
};

const ContractRoom = ({ signaling, sessionId }: { signaling: WebSocket; sessionId: String }) => {
  const navigation = useNavigate();
  const { roomId, clientId } = useParams();
  const { role } = useRoleStore();
  const [stompClient, setStompClient] = useState<Client | null>(null);
  // const { isDoneIdent, setIsDoneIdent } = useIdentStore();
  const [isDoneIdent, setIsDoneIdent] = useState(sessionStorage.getItem('identification'));
  const [message, setMessage] = useState<any>({});

  // useRef로 videoRef 선언
  // const localVideoRef = useRef<HTMLVideoElement | null>(null);
  // const remoteVideoRef = useRef<HTMLVideoElement | null>(null);

  const { startVideo, localVideoRef, remoteVideoRef } = useWebRTC({
    signaling,
    sessionId,
    roomId,
  });
  // console.log(localVideoRef.current?.srcObject, localStreamRef, remoteStreamRef);
  //client가 /contract/id 로 처음 첩근 시 clientToken 생성 (게스트 로그인)
  //연결 완료
  useEffect(() => {
    if (role === 'guest' && !sessionStorage.getItem('clientToken'))
      navigation(`/connecting/${roomId}/${clientId}`);
    if (localVideoRef.current && remoteVideoRef.current) {
      startVideo();
    }

    //웹소켓
    if ('WebSocket' in window) {
      const stompClient = new Client({
        brokerURL: `${import.meta.env.VITE_WSS_URL}/ws-stomp`,
        connectHeaders: {
          Authorization: `Bearer ${sessionStorage.getItem('token') || sessionStorage.getItem('clientToken')}`,
        },
        onConnect: () => {
          //구독
          setupSubscription(stompClient);
        },
        onStompError: (frame) => {
          console.error('웹소켓 에러 발생: ' + frame.body);
        },
      });

      stompClient.activate();
      setStompClient(stompClient);

      return () => {
        stompClient.deactivate();
      };
    } else {
      console.error('웹소켓을 지원하지 않는 브라우저입니다.');
    }
  }, [localVideoRef, remoteVideoRef]);

  //응답확인
  const setupSubscription = (_stompClient: Client) => {
    _stompClient.subscribe(`/sub/rooms/${roomId}`, (message) => {
      const newMSG = JSON.parse(message.body);
      console.log(newMSG);

      //pageNum이 0으로 오면 본인인증완료된거임
      if (newMSG.pageNum === 0) {
        setIsDoneIdent('Done');
        sessionStorage.setItem('identification', 'Done');

        window.location.reload();
      } else {
        setMessage(newMSG);
      }
    });
  };

  useEffect(() => {
    console.log(localVideoRef.current);
  }, [localVideoRef.current]);

  return (
    <>
      {isDoneIdent ? (
        <Contract localVideoRef={localVideoRef} remoteVideoRef={remoteVideoRef} stompClient={stompClient} msgItem={message} />
      ) : (
        <Identification
          localVideoRef={localVideoRef}
          remoteVideoRef={remoteVideoRef}
          stompClient={stompClient}
        />
      )}
    </>
  );
};
