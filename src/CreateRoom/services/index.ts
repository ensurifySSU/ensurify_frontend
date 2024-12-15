import instance from '../../Common/apis/instance';
import { IcreateRoomValue } from '../types/createRoomTypes';

export const createRoom = async ({ contractDocumentId, clientId }: IcreateRoomValue) => {
  const response = await instance.post('/contracts', {
    contractDocumentId: contractDocumentId,
    clientId: clientId,
  });
  return response.data;
};
