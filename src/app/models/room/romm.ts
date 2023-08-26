import { Reservation } from '../exports';

export type Room = {
  id: string;
  number: string;
  capacity: string;
  availability: boolean;
  reservationId?: string | null;
  createdBy: string;
  updatedBy: string;
  createdTime: string;
  updatedTime: string;
};
