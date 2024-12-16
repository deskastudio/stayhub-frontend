import axios from 'axios';
import { useEffect, useState } from 'react';
import { IUser } from '../interfaces/models/UserInterface';

interface UseResult {
  user: IUser[] | null;
  loading: boolean;
  fetchUsers: () => void;
}

export const useFetchUsers = (): UseResult => {
  const [user, setUser] = useState<IUser[] | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  const fetchUsers = async () => {
    const token = sessionStorage.getItem('token');
    setLoading(true);

    try {
      const response = await axios.get(
        'https://stayhub-api.vercel.app/list/user',
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
          withCredentials: true,
        }
      );

      setUser(response.data.data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  return { fetchUsers, user, loading };
};
