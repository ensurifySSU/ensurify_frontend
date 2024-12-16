import { useEffect } from 'react';
import { useRoleStore } from '../stores/roleStore';

const useRole = () => {
  const { setRole } = useRoleStore();

  useEffect(() => {
    const token = sessionStorage.getItem('token');
    const clientToken = sessionStorage.getItem('clientToken');

    if (token) {
      setRole('user');
    } else if (clientToken) {
      setRole('client');
    } else {
      setRole('guest');
    }
  }, []);
};

export default useRole;
