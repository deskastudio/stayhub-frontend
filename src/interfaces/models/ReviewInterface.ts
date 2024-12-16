import { IRoom } from './RoomInterface';

export interface IReview {
  id: string;
  user: string;
  room: IRoom;
  rating: number;
  comment: string;
  createdAt: string;
  updatedAt: string;
}
