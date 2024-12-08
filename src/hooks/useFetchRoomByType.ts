import { useEffect, useState } from 'react';
import axios from 'axios';

interface Room {
  id: string;
  name: string;
  images: { url: string }[];
  type: RoomType[];
}

interface RoomType {
  id: string;
  name: string;
  description: string;
  cost: number;
  facility: Facility[];
}

interface Facility {
  id: string;
  name: string;
}

interface UseFetchRoomResult {
  room: Room | null;
  currentType: RoomType | null;
  availableRooms: { id: string; name: string }[];
  currentImage: string[];
  loading: boolean;
}

export const useFetchRoomByType = (id: string): UseFetchRoomResult => {
  const [room, setRoom] = useState<Room | null>(null);
  const [currentType, setCurrentType] = useState<RoomType | null>(null);
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
        const roomList = response.data.data;

        if (roomList.length > 0) {
          setRoom(roomList[0]);
          setCurrentType(roomList[0].type[0]);
          setAvailableRooms(
            roomList.map((room: Room) => ({ id: room.id, name: room.name }))
          );
          setCurrentImage(roomList.map((room: Room) => room.images[0]?.url));
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
