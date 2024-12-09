import { useEffect, useState } from 'react';
import axios from 'axios';

interface User {
  id: string;
  fullName: string;
  phone: number;
  email: string;
  verified: boolean;
  status: string;
  role: string;
}

interface UseResult {
  user: User | null;
  loading: boolean;
}

export const useFetchUsers = (): UseResult => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const token = sessionStorage.getItem('token');

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        setLoading(true);

        const response = await axios.get('http://localhost:8000/list/user', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
          withCredentials: true,
        });

        setUser(response.data.data);
        console.log('Data user:', response.data.data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, [token]);

  return { user, loading };
};
