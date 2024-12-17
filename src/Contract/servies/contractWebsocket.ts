import { Client } from '@stomp/stompjs';

interface IPageProps {
  stompClient: Client | null;
  data: {
    roomId: number | string;
    pageNum: number;
  };
}

interface ICheckProps {
  stompClient: Client | null;
  data: {
    roomId: number | string;
    checkNum: number;
    imgUrl: string;
  };
}

interface ISignProps {
  stompClient: Client | null;
  data: {
    roomId: number | string;
    signNum: number;
    imgUrl: string;
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

//pub/page 에 메시지 전송
export const sendSignWS = async ({ stompClient, data }: ISignProps) => {
  if (stompClient) {
    stompClient.publish({
      destination: '/pub/page',
      headers: {
        Authorization: `Bearer ${sessionStorage.getItem('token')}`,
      },
      body: JSON.stringify({
        roomId: data.roomId,
        signNum: data.signNum,
        imgUrl: data.imgUrl,
      }),
    });
  }
};

//pub/page 에 메시지 전송
export const sendCheckWS = async ({ stompClient, data }: ICheckProps) => {
  if (stompClient) {
    stompClient.publish({
      destination: '/pub/page',
      headers: {
        Authorization: `Bearer ${sessionStorage.getItem('token')}`,
      },
      body: JSON.stringify({
        roomId: data.roomId,
        pageNum: data.checkNum,
        imgUrl: data.imgUrl,
      }),
    });
  }
};