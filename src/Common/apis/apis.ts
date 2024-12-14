import instance from './instance';

const base_url = import.meta.env.VITE_BASE_URL;

export const getUserInfo = async () => {
  const { data } = await instance.get(`${base_url}/users`);
  return data;
};

export const getClientList = async () => {
  const { data } = await instance.get(`${base_url}/clients`);
  return data;
};

export const getContractDocsList = async () => {
  const { data } = await instance.get(`${base_url}/contracts/docs`);
  return data;
};

export const getClientDetailInfo = async (clientId: number | undefined) => {
  if (!clientId) return;
  const { data } = await instance.get(`${base_url}/clients/${clientId}`);
  return data;
};
