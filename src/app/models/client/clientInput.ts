import { Reservation } from '../exports';

export type clientInput = {
  name: string;
  passport: string;
  email: string;
  phone: string;
  age: 'younger' | 'adult';
};
