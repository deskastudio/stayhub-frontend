import { IRoomFacility } from './RoomFacilityInterface';

export interface IRoomType {
  id: string;
  name: string;
  facility: IRoomFacility[];
  description: string;
  cost: number;
  createdAt: Date;
  updatedAt: Date;
}
