import axios from 'axios';
import { useEffect, useState } from 'react';
import { IRoom } from '../interfaces/models/RoomInterface';
import { IRoomType } from '../interfaces/models/RoomTypeInterface';

// Interface
interface UseFetchRoomResult {
  room: IRoom | null;
  currentType: IRoomType | null;
  availableRooms: { id: string; name: string }[];
  currentImage: string[];
  loading: boolean;
}

export const useFetchRoomByType = (id: string): UseFetchRoomResult => {
  const [room, setRoom] = useState<IRoom | null>(null);
  const [currentType, setCurrentType] = useState<IRoomType | null>(null);
  const [availableRooms, setAvailableRooms] = useState<
    { id: string; name: string }[]
  >([]);
  const [currentImage, setCurrentImage] = useState<string[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchRoom = async () => {
      setLoading(true);

      try {
        const response = await axios.get(
          `http://localhost:8000/room/type/${id}`
        );

        const data = response.data.data;
        if (data.length > 0) {
          setRoom(data[0]);
          setCurrentType(data[0].type[0]);
          setAvailableRooms(
            data.map((room: IRoom) => ({ id: room.id, name: room.name }))
          );
          setCurrentImage(data.map((room: IRoom) => room.images[0]?.url));
        } else {
          setRoom(null);
          setCurrentType(null);
          setAvailableRooms([]);
          setCurrentImage([]);
        }
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    if (id) fetchRoom();
  }, [id]);

  return { room, currentType, availableRooms, currentImage, loading };
};
