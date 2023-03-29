import { client, clientInput } from '../exports';

export type reservationInput = {
  description: string;
  dateIn: string;
  dateOut: string;
  timeIn: string;
  timeOut: string;
  paidNights: string;
  clients: clientInput[];
};
