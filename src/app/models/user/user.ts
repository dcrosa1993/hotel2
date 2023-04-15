import { Reservation } from '../exports';
import { UserAccess } from './user-access';

export type User = {
  id: string;
  phone: string;
  baned: boolean;
  name: string;
  email: string;
  role: string;
  changePassword: boolean;
  userAccess: UserAccess;
  reservations: Reservation;
  createdBy: string;
  updatedBy: string;
  createdTime: string;
  updatedTime: string;
};
