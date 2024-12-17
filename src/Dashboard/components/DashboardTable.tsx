import styled from '@emotion/styled';
import { TABLE_LABEL } from '../contants/TABLE_LABEL';
import { useQuery } from '@tanstack/react-query';
import { getHistoryContract } from '../servies';
import { IHistoryContract } from '../types/historyContractType';

const DashboardTable = () => {
  const { data } = useQuery({
    queryKey: [history],
    queryFn: getHistoryContract,
  });
  return (
    <StTable>
      <thead>
        <StTableRow>
          {TABLE_LABEL.map((item) => (
            <StTableHeader key={item}>{item}</StTableHeader>
          ))}
        </StTableRow>
      </thead>
      <tbody>
        {data?.result?.contractList.map((item: IHistoryContract) => (
          <StTableRow key={item.contractId}>
            <StTableCell>{item.name}</StTableCell>
            <StTableCell>{item.category}</StTableCell>
            <StTableCell>{item.client}</StTableCell>
            <StTableCell>-</StTableCell>
            <StTableCell>{item.date}</StTableCell>
            <StTableCell>-</StTableCell>
          </StTableRow>
        ))}
      </tbody>
    </StTable>
  );
};

export default DashboardTable;

const StTable = styled.table`
  border-collapse: collapse;
  width: 100%;
  margin-top: 0.2rem;

  & > thead {
    background-color: #fbedbc;
  }
`;

const StTableRow = styled.tr`
  font-size: 1.4rem;
  font-weight: 500;
  text-align: left;
  border-bottom: 1px solid #aeaeae;
`;

const StTableHeader = styled.th`
  padding: 1.2rem 0 1.2rem 2rem;
  text-align: left;

  &:not(:last-child) {
    border-right: 1px solid #aeaeae;
  }
`;

const StTableCell = styled.td`
  padding: 2rem 0 2rem 2rem;
  text-align: left;
  vertical-align: middle;

  &:not(:last-child) {
    border-right: 1px solid #aeaeae;
  }
`;
