import { IUser } from './UserInterface';
import { IRoom } from './RoomInterface';

export interface IRoomComplaint {
  id: string;
  user: IUser;
  room: IRoom;
  title: string;
  description: string;
  status: string;
  response: string;
  createdAt: string;
  updatedAt: string;
}
