import Contract from './components/Contract/Contract';
import Identification from './components/Identification/Identification';
import { useState } from 'react';

const ContractRoom = () => {
  const [isDoneIdent] = useState<boolean>(false);
  const renderPage = () => {
    return isDoneIdent ? <Contract /> : <Identification />;
  };
  return renderPage();
};

export default ContractRoom;
