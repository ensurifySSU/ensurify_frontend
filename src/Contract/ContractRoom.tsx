import Contract from './components/Contract/Contract';
import Identification from './components/Identification/Identification';
import { useState } from 'react';

const ContractRoom = () => {
  const [isDoneIdent] = useState(false);
  const renderPage = () => {
    return isDoneIdent ? <Identification /> : <Contract />;
  };
  return renderPage();
};

export default ContractRoom;
