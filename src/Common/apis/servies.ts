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
