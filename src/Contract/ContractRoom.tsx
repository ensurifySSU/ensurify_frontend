import { useNavigate, useParams } from 'react-router-dom';
import Contract from './components/Contract/Contract';
import Identification from './components/Identification/Identification';
import { useEffect, useState } from 'react';
import { useRoleStore } from '../Common/stores/roleStore';
import useWebRTCSocket from './components/WebRTC/useWebRTCSocket';
import useWebRTC from './components/WebRTC/useWebRTC';

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

  const { localVideoRef, remoteVideoRef, startVideo } = useWebRTC({ signaling, sessionId });
  //client가 /contract/id 로 처음 첩근 시 clientToken 생성 (게스트 로그인)
  //연결 완료
  useEffect(() => {
    if (role === 'guest' && !sessionStorage.getItem('clientToken'))
      navigation(`/connecting/${roomId}/${clientId}`);
    startVideo();
  }, []);

  const [isDoneIdent] = useState<boolean>(false);
  const renderPage = () => {
    return isDoneIdent ? (
      <Contract />
    ) : (
      <>
        {signaling && sessionId && (
          <Identification localVideoRef={localVideoRef} remoteVideoRef={remoteVideoRef} />
        )}
      </>
    );
  };
  return renderPage();
};
