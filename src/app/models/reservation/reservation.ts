import { client, Room } from '../exports';

export type Reservation = {
  id: string;
  noClients: string;
  description: string;
  dateIn: string;
  dateOut: string;
  totalCost: string;
  discount: string;
  totalNights: string;
  paymentNights: string;
  management: string;
  transport: string;
  advanceManagement: boolean;
  roomId: string;
  clientsId: string[];
  createdBy: string;
  updatedBy: string;
  createDate: string;
  updateDate: string;
};
