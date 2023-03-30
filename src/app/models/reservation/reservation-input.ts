import { client, clientInput } from '../exports';

export type reservationInput = {
  description: string;
  dateIn: string;
  dateOut: string;
  timeIn: string;
  timeOut: string;
  paymentNights: string;
  clients: clientInput[];
  advanceManagement: boolean;
};
