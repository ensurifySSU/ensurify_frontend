import clientInstance from './clientInstance';
import instance from './instance';

export const getUserInfo = async () => {
  const { data } = await instance.get(`/users`);
  return data;
};

export const getClientList = async () => {
  const { data } = await instance.get(`/clients`);
  return data;
};

export const getContractDocsList = async () => {
  const { data } = await instance.get(`/contracts/docs`);
  return data;
};

export const getClientDetailInfo = async (clientId: number | string | undefined) => {
  if (!clientId) return;
  const { data } = await instance.get(`/clients/${clientId}`);
  return data;
};

export const getFileDownload = async (fileName: string | undefined) => {
  if (!fileName) return;
  const { data } = await instance.get(`/s3/download?fileName=${fileName}`);
  return data;
};

export const postAI = async (item: any) => {
  const { data } =
    item?.tokenType == 'client'
      ? await clientInstance.post(`/openai/chat`, { question: item?.question })
      : await instance.post(`/openai/chat`, { question: item?.question });
  return data;
};

export const postFileUpload = async (file: File) => {
  const formData = new FormData();
  formData.append('file', file);
  const config = {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  };
  const { data } = await instance.post(`/s3/upload`, formData, config);
  return data;
};
