import { IRoomType } from './RoomTypeInterface';

export interface IRoom {
  id: string;
  name: string;
  status: string;
  type: IRoomType[];
  reviews: string;
  complaints: string;
  images: { url: string; filename: string }[];
  transaction: string;
  createdAt: Date;
  updatedAt: Date;
}
