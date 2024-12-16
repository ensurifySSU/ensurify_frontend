import styled from '@emotion/styled';
import { LeftPrimarySection, RightSideSheet } from '../../../Common/styles/commonStyles';
import { useRoleStore } from '../../../Common/stores/roleStore';
import { useQuery } from '@tanstack/react-query';
import { useParams } from 'react-router-dom';
import { getClientDetailInfo } from '../../../Common/apis/servies';
import { ClientInfoCard } from '../../../Common/components/InfoCard';
import Button from '../../../Common/components/Button';
import { Client } from '@stomp/stompjs';
import { sendPageWS } from '../../servies/contractWebsocket';
import { forwardRef } from 'react';

const 고객정보 = ({ clientId }: { clientId: string | undefined }) => {
  if (!clientId) return;
  const { data } = useQuery({
    queryKey: ['clientDetail', clientId],
    queryFn: () => getClientDetailInfo(clientId),
    enabled: !!clientId,
  });

  return data && <ClientInfoCard data={data.result} />;
};

interface Props {
  localVideoRef: React.RefObject<HTMLVideoElement> | null;
  remoteVideoRef: React.RefObject<HTMLVideoElement> | null;
  stompClient: Client | null;
}

const Identification = forwardRef<HTMLDivElement, Props>(
  ({ localVideoRef, remoteVideoRef, stompClient }: Props, ref) => {
    const { role } = useRoleStore();
    const { roomId, clientId } = useParams();

    const handleClick = async () => {
      if (!roomId) return;
      const data = {
        roomId: roomId,
        pageNum: 0,
      };
      await sendPageWS({ stompClient, data });
    };

    return (
      <StContainer ref={ref}>
        <LeftPrimarySection>
          <StWrapper>
            {role === 'user' ? (
              <StMain>
                <StMainVideo ref={remoteVideoRef} autoPlay playsInline muted />
                <StMainText>
                  고객의 신분증으로 본인확인을 진행합니다.
                  <br />
                  신분 확인 완료 후 고객 확인 버튼을 클릭하세요.
                </StMainText>
              </StMain>
            ) : (
              <StMain>
                <StMainVideo ref={localVideoRef} autoPlay playsInline muted />
                <StMainText>
                  신분증으로 본인확인을 진행합니다.
                  <br />
                  카메라에 신분증을 제시해주세요.
                </StMainText>
              </StMain>
            )}
          </StWrapper>
        </LeftPrimarySection>
        <RightSideSheet>
          {role === 'user' ? (
            <>
              <StColum>
                <StSideSheetVideo ref={localVideoRef} autoPlay playsInline muted={true} />
                <고객정보 clientId={clientId} />
              </StColum>
              <Button content="고객 확인" handleClick={handleClick} />
            </>
          ) : (
            <>
              <StColum>
                <StSideSheetVideo ref={remoteVideoRef} autoPlay playsInline muted={true} />
              </StColum>
              <StSideSheetText>
                상담원이 확인을 완료하면 <br />
                계약이 시작됩니다.
              </StSideSheetText>
            </>
          )}
        </RightSideSheet>
      </StContainer>
    );
  },
);

export default Identification;

const StContainer = styled.div`
  height: 100%;
`;

const StWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;

  width: 100%;
  height: 100%;

  background-color: #fff;
  border-radius: 10px;
`;

const StSideSheetVideo = styled.video`
  transform: scaleX(-1);
  width: 100%;
`;

const StMainVideo = styled.video`
  transform: scaleX(-1);
  width: 80%;
`;

const StColum = styled.div`
  display: flex;
  flex-direction: column;
  gap: 3rem;
  align-items: center;
`;
const StMain = styled.div`
  display: flex;
  flex-direction: column;
  gap: 3rem;
  align-items: center;
`;

const StSideSheetText = styled.p`
  width: 23rem;

  font-size: 2rem;
  font-weight: 600;
  text-align: center;
  overflow-wrap: break-word;
`;

const StMainText = styled.p`
  font-size: 1.8rem;
  font-size: 500;
  text-align: center;
`;
