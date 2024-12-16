import { IRoomType } from './RoomTypeInterface';
import { ITransaction } from './TransactionInterface';

export interface IRoom {
  id: string;
  name: string;
  status: string;
  type: IRoomType[];
  reviews: string;
  complaints: string;
  images: { url: string; filename: string }[];
  transaction: ITransaction[];
  createdAt: Date;
  updatedAt: Date;
}
