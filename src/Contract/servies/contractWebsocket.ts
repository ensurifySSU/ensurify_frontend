import { Client } from '@stomp/stompjs';

interface IPageProps {
  stompClient: Client | null;
  data: {
    roomId: number | string;
    pageNum: number;
  };
}

//pub/page 에 메시지 전송
export const sendPageWS = async ({ stompClient, data }: IPageProps) => {
  if (stompClient) {
    stompClient.publish({
      destination: '/pub/page',
      headers: {
        Authorization: `Bearer ${sessionStorage.getItem('token')}`,
      },
      body: JSON.stringify({
        roomId: data.roomId,
        pageNum: data.pageNum,
      }),
    });
  }
};
