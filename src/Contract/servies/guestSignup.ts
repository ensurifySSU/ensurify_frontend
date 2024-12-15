import client from '../../client';

export const guestSignup = async () => {
  const { data } = await client.post('/users/guests/signup');
  return data;
};
