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
                {/* <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="150"
                  height="150"
                  viewBox="0 0 150 150"
                  fill="none"
                >
                  <path
                    fill-rule="evenodd"
                    clip-rule="evenodd"
                    d="M82.5 120C86.4782 120 90.2936 121.58 93.1066 124.393C95.9196 127.206 97.5 131.022 97.5 135C97.5 138.978 95.9196 142.794 93.1066 145.607C90.2936 148.42 86.4782 150 82.5 150C78.5218 150 74.7064 148.42 71.8934 145.607C69.0804 142.794 67.5 138.978 67.5 135C67.5 131.022 69.0804 127.206 71.8934 124.393C74.7064 121.58 78.5218 120 82.5 120ZM35.5575 97.5C40.5303 97.5 45.2994 99.4754 48.8158 102.992C52.3321 106.508 54.3075 111.277 54.3075 116.25C54.3075 121.223 52.3321 125.992 48.8158 129.508C45.2994 133.025 40.5303 135 35.5575 135C30.5847 135 25.8156 133.025 22.2992 129.508C18.7829 125.992 16.8075 121.223 16.8075 116.25C16.8075 111.277 18.7829 106.508 22.2992 102.992C25.8156 99.4754 30.5847 97.5 35.5575 97.5ZM122.393 101.25C126.371 101.25 130.186 102.83 132.999 105.643C135.812 108.456 137.393 112.272 137.393 116.25C137.393 120.228 135.812 124.044 132.999 126.857C130.186 129.67 126.371 131.25 122.393 131.25C118.414 131.25 114.599 129.67 111.786 126.857C108.973 124.044 107.393 120.228 107.393 116.25C107.393 112.272 108.973 108.456 111.786 105.643C114.599 102.83 118.414 101.25 122.393 101.25ZM138.75 69.8925C141.734 69.8925 144.595 71.0778 146.705 73.1875C148.815 75.2973 150 78.1588 150 81.1425C150 84.1262 148.815 86.9877 146.705 89.0975C144.595 91.2072 141.734 92.3925 138.75 92.3925C135.766 92.3925 132.905 91.2072 130.795 89.0975C128.685 86.9877 127.5 84.1262 127.5 81.1425C127.5 78.1588 128.685 75.2973 130.795 73.1875C132.905 71.0778 135.766 69.8925 138.75 69.8925ZM18.75 45C23.7228 45 28.4919 46.9754 32.0083 50.4917C35.5246 54.0081 37.5 58.7772 37.5 63.75C37.5 68.7228 35.5246 73.4919 32.0083 77.0083C28.4919 80.5246 23.7228 82.5 18.75 82.5C13.7772 82.5 9.00805 80.5246 5.49175 77.0083C1.97544 73.4919 0 68.7228 0 63.75C0 58.7772 1.97544 54.0081 5.49175 50.4917C9.00805 46.9754 13.7772 45 18.75 45ZM133.395 39.0525C135.384 39.0525 137.292 39.8427 138.698 41.2492C140.105 42.6557 140.895 44.5634 140.895 46.5525C140.895 48.5416 140.105 50.4493 138.698 51.8558C137.292 53.2623 135.384 54.0525 133.395 54.0525C131.406 54.0525 129.498 53.2623 128.092 51.8558C126.685 50.4493 125.895 48.5416 125.895 46.5525C125.895 44.5634 126.685 42.6557 128.092 41.2492C129.498 39.8427 131.406 39.0525 133.395 39.0525ZM60 0C65.9674 0 71.6903 2.37053 75.9099 6.5901C80.1295 10.8097 82.5 16.5326 82.5 22.5C82.5 28.4674 80.1295 34.1903 75.9099 38.4099C71.6903 42.6295 65.9674 45 60 45C54.0326 45 48.3097 42.6295 44.0901 38.4099C39.8705 34.1903 37.5 28.4674 37.5 22.5C37.5 16.5326 39.8705 10.8097 44.0901 6.5901C48.3097 2.37053 54.0326 0 60 0ZM116.25 22.5C117.245 22.5 118.198 22.8951 118.902 23.5984C119.605 24.3016 120 25.2554 120 26.25C120 27.2446 119.605 28.1984 118.902 28.9016C118.198 29.6049 117.245 30 116.25 30C115.255 30 114.302 29.6049 113.598 28.9016C112.895 28.1984 112.5 27.2446 112.5 26.25C112.5 25.2554 112.895 24.3016 113.598 23.5984C114.302 22.8951 115.255 22.5 116.25 22.5Z"
                    fill="#04CBA4"
                  />
                </svg> */}
                <StMainText>
                  {/* 고객 입장 대기중입니다. 잠시만 기다려주세요. */}
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
                <StTip>
                  Ensurify는 고객님의 정보를 바탕으로 계약에 대한 맞춤형 QnAI를 제공합니다.
                </StTip>
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
  background-color: #d9d9d9;
`;

const StMainVideo = styled.video`
  transform: scaleX(-1);

  width: 80%;
  min-width: 40rem;
  height: 40rem;

  background-color: #d9d9d9;
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
  margin-bottom: 2rem;

  font-size: 2rem;
  font-weight: 600;
  text-align: center;
  overflow-wrap: break-word;
`;

const StMainText = styled.p`
  font-size: 1.8rem;
  font-size: 500;
  line-height: 2rem;
  text-align: center;
`;

const StTip = styled.p`
  padding: 1rem 2rem;
  font-size: 1.5rem;
  background: rgb(255 215 85 / 10%);
  border-radius: 10px;
`;
