import clientInstance from '../../Common/apis/clientInstance';

export const enterRoom = async (roomId: number | string) => {
  const { data } = await clientInstance.post(`/rooms/${roomId}`);
  return data;
};
