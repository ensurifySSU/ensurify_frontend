import instance from '../../Common/apis/instance';

export const getHistoryContract = async () => {
  const { data } = await instance.get(`/contracts/history`);
  return data;
};
