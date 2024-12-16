import axios from 'axios';
import { useEffect, useState } from 'react';
import { getUserId } from '../utils/auth.utils';
import { IUser } from '../interfaces/models/UserInterface';
import { IRoomComplaint } from '../interfaces/models/RoomComplaintInterfaces';

export const useFetchComplaint = () => {
  const [complaint, setComplaint] = useState<IRoomComplaint[] | null>(null);
  const [user, setUser] = useState<IUser | null>(null);
  const [loading, setLoading] = useState(true);
  const id = getUserId();

  useEffect(() => {
    const fetchComplaint = async () => {
      const token = sessionStorage.getItem('token');
      setLoading(true);

      try {
        const response = await axios.get(
          `https://stayhub-api.vercel.app/complaint/${id}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
            withCredentials: true,
          }
        );

        const data = response.data.data;
        if (data.length > 0) {
          setComplaint(data.map((complaint: IRoomComplaint) => complaint));
          setUser(data.user);
        } else {
          setComplaint(null);
          setUser(null);
        }
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchComplaint();
  }, [id]);

  return { complaint, user, loading };
};
