import client from '../../client';

export const guestSignup = async (clientId: string) => {
  const { data } = await client.post('/users/guests/signup', { clientId: clientId });
  return data;
};
