import { useNavigate, useParams } from 'react-router-dom';
import Contract from './components/Contract/Contract';
import Identification from './components/Identification/Identification';
import { useEffect, useState } from 'react';

const ContractRoom = () => {
  const navigation = useNavigate();
  const { roomId } = useParams();
  //client가 /contract/id 로 처음 첩근 시 clientToken 생성 (게스트 로그인)
  //연결 완료
  useEffect(() => {
    if (!sessionStorage.getItem('clientToken')) navigation(`/connecting/${roomId}`);
  }, []);

  const [isDoneIdent] = useState<boolean>(false);
  const renderPage = () => {
    return isDoneIdent ? <Contract /> : <Identification />;
  };
  return renderPage();
};

export default ContractRoom;
