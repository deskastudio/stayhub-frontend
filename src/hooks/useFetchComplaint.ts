import axios from 'axios';
import { useEffect, useState } from 'react';
import { getUserId } from '../utils/auth.utils';

// Interface
interface User {
  id: string;
  name: string;
}

interface Room {
  id: string;
  name: string;
}

interface Images {
  id: string;
  url: string;
}

interface Complaint {
  id: string;
  user: User[];
  room: Room[];
  title: string;
  description: string;
  status: string;
  images: Images[];
  createdAt: string;
}

export const useFetchComplaint = () => {
  const [complaint, setComplaint] = useState<Complaint[] | null>(null);
  const [user, setUser] = useState<User | null>(null);
  const [images, setImage] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);
  const id = getUserId();

  useEffect(() => {
    const fetchComplaint = async () => {
      const token = sessionStorage.getItem('token');
      setLoading(true);

      try {
        const response = await axios.get(
          `http://localhost:8000/complaint/${id}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
            withCredentials: true,
          }
        );

        const data = response.data.data;
        if (data.length > 0) {
          setComplaint(data.map((complaint: Complaint) => complaint));
          setUser(data.user);
          setImage(
            data.map((complaint: Complaint) => complaint?.images[0]?.url)
          );
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

  return { complaint, user, images, loading };
};
