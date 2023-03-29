import { Reservation } from '../exports';

export type client = {
  id: string;
  name: string;
  passport: string;
  email: string;
  phone: string;
  age: string;
  reservations: Reservation[];
  createdBy: string;
  updatedBy: string;
  createDate: string;
  updateDate: string;
};
