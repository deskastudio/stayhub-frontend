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
  fetchUsers: () => void;
}

export const useFetchUsers = (): UseResult => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  const fetchUsers = async () => {
    const token = sessionStorage.getItem('token');
    setLoading(true);

    try {
      const response = await axios.get('http://localhost:8000/list/user', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        withCredentials: true,
      });

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
