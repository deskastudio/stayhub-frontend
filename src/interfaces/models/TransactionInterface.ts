import { IRoom } from './RoomInterface';
import { IUser } from './UserInterface';

export interface ITransaction {
  user: IUser;
  room: IRoom;
  cost: number;
  status: string;
  createdAt: string;
  updatedAt: string;
}
