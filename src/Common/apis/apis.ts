import instance from './instance';

const base_url = import.meta.env.VITE_BASE_URL;

export const getUserInfo = async () => {
  const { data } = await instance.get(`${base_url}/users`);
  return data;
};
