import { IRoom } from './RoomInterface';

export interface IUser {
  id: string;
  fullName: string;
  email: string;
  phone: number;
  address: string;
  role: string;
  password: string;
  verified: boolean;
  profileImages: { url: string; filename: string }[];
  ktpImages: { url: string; filename: string }[];
  room: IRoom;
  createdAt: Date;
  updatedAt: Date;
}
