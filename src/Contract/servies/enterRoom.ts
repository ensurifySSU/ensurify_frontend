import clientInstance from '../../Common/apis/clientInstance';

export const enterRoom = async (roomId: number | string, clientId: number | string) => {
  const { data } = await clientInstance.post(`/rooms/${roomId}`, { clientId: clientId });
  return data;
};
