import styled from '@emotion/styled';
import { RightSideSheetWidth } from '../Common/constants/SIZES';
import { IcSearch } from './assets/0_index';
import SearchItem from './components/SearchItem';
import Button from '../Common/components/Button';
import { LeftPrimarySection, RightSideSheet } from '../Common/styles/commonStyles';
import { useMutation, useQuery } from '@tanstack/react-query';
import { getClientDetailInfo, getClientList, getContractDocsList } from '../Common/apis/servies';
import { IClientListType, IContractDocsType, IcreateRoomValue } from './types/createRoomTypes';
import { useRoomStore } from '../Common/stores/seletedContractStore';
import { Suspense } from 'react';
import { createRoom } from './services';
import { useNavigate } from 'react-router-dom';
import { BasicInfoCard, ClientInfoCard } from '../Common/components/InfoCard';

const Input = ({ placeholder }: { placeholder: string }) => {
  return (
    <StInput.container>
      <StInput.input placeholder={placeholder} />
      <IcSearch />
    </StInput.container>
  );
};

const 계약상품 = () => {
  const selectedContract = useRoomStore((state) => state.selectedContract);
  if (!selectedContract) return;

  return BasicInfoCard(selectedContract.name, selectedContract.category);
};

const 고객정보 = () => {
  const selectedClient = useRoomStore((state) => state.selectedClient);

  const { data } = useQuery({
    queryKey: ['clientDetail', selectedClient?.clientId],
    queryFn: () => getClientDetailInfo(selectedClient?.clientId),
    enabled: !!selectedClient?.clientId,
  });

  if (!selectedClient) return;

  return data && <ClientInfoCard data={data.result} />;
};

const CreateRoom = () => {
  const navigation = useNavigate();

  const { data: clientList } = useQuery({
    queryKey: ['clients'],
    queryFn: getClientList,
  });

  const { data: contractDocsList } = useQuery({
    queryKey: ['docs'],
    queryFn: getContractDocsList,
  });

  const setSelectedContract = useRoomStore((state) => state.setSelectedContract);
  const selectedContract = useRoomStore((state) => state.selectedContract);
  const setSelectedClient = useRoomStore((state) => state.setSelectedClient);
  const selectedClient = useRoomStore((state) => state.selectedClient);

  const onCreateRoom = useMutation({
    mutationFn: createRoom,
    onSuccess: (data) => {
      navigation(`/contract/${data.result.roomId}/${selectedClient?.clientId}`);
    },
    onError: (error) => {
      console.log('에러 발생! 아래 메시지를 확인해주세요.', error);
    },
  });

  const handleCreateRoom = () => {
    if (!selectedContract?.contractDocumentId || !selectedClient?.clientId) return;
    const requstData: IcreateRoomValue = {
      contractDocumentId: selectedContract.contractDocumentId,
      clientId: selectedClient.clientId,
    };
    onCreateRoom.mutate(requstData);
  };

  return (
    <StContainer>
      <LeftPrimarySection>
        <SelectableBox.container>
          <SelectableBox.label>계약 선택</SelectableBox.label>
          <Input placeholder="계약명을 검색하세요" />
          {contractDocsList?.result?.contractDocumentList?.map((item: IContractDocsType) => {
            return (
              <SearchItem
                key={item.contractDocumentId}
                title={item.name}
                tag={item.category}
                onClick={() =>
                  setSelectedContract({
                    contractDocumentId: item.contractDocumentId,
                    name: item.name,
                    category: item.category,
                  })
                }
              />
            );
          })}
        </SelectableBox.container>
        <SelectableBox.container>
          <SelectableBox.label>고객 선택</SelectableBox.label>
          <Input placeholder="고객명을 검색하세요" />
          {clientList?.result?.clientList?.map((item: IClientListType) => {
            return (
              <SearchItem
                key={item.clientId}
                title={item.name}
                tag={item.email}
                onClick={() =>
                  setSelectedClient({
                    clientId: item.clientId,
                    name: item.name,
                    email: item.email,
                  })
                }
              />
            );
          })}
        </SelectableBox.container>
      </LeftPrimarySection>
      <RightSideSheet>
        <StSideSheet.box>
          <StSideSheet.label>계약 상품</StSideSheet.label>
          <계약상품 />
        </StSideSheet.box>
        <StSideSheet.box>
          <StSideSheet.label>고객 정보</StSideSheet.label>
          <Suspense fallback={<>loading..</>}>
            <고객정보 />
          </Suspense>
        </StSideSheet.box>
        <Button
          width="70%"
          content="새 계약 생성하기"
          isActive={Boolean(selectedContract && selectedClient)}
          handleClick={handleCreateRoom}
        />
      </RightSideSheet>
    </StContainer>
  );
};

export default CreateRoom;

const StContainer = styled.div`
  height: 100%;
`;

const StSideSheet = {
  container: styled.aside`
    position: fixed;
    top: 6rem;
    right: 0;

    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-around;

    width: ${RightSideSheetWidth}rem;
    height: calc(100% - 6rem);
    padding: 5rem;

    background-color: white;
  `,
  box: styled.div`
    position: relative;

    display: flex;
    flex-direction: column;
    gap: 2rem;

    width: 100%;
    height: 40%;
  `,
  label: styled.p`
    font-size: 2rem;
    font-weight: 700;
    color: #000;
  `,
};

const SelectableBox = {
  container: styled.div`
    display: flex;
    flex-direction: column;
    gap: 2rem;

    width: 49%;
    height: 100%;
    padding: 2rem;

    background-color: white;
    border-radius: 10px;
  `,
  label: styled.p`
    font-size: 1.8rem;
    font-weight: 700;
    color: #000;
  `,
};

const StInput = {
  container: styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;

    width: 100%;
    height: 5rem;
    padding: 0 1rem;

    border: 1px solid #aeaeae;
    border-radius: 3px;
  `,
  input: styled.input`
    width: 90%;
    height: 100%;

    background-color: transparent;
    border: none;
    outline: none;
  `,
};

const StSeletedContaienr = styled.div`
  display: flex;
  gap: 1rem;
  align-items: end;

  width: 100%;
  height: fit-content;
  padding: 2rem;

  font-size: 1.3rem;

  background-color: rgb(255 215 85 / 20%);
  border-radius: 10px;
`;
