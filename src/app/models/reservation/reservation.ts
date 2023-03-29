import { client, Room } from '../exports';

export type Reservation = {
  Id: string;
  NoClients: string;
  Description: string;
  DateIn: string;
  DateOut: string;
  TotalCost: string;
  Discount: string;
  TotalNights: string;
  PaymentNights: string;
  Management: string;
  Transport: string;
  AdvanceManagement: string;
  Room: Room;
  Clients: client[];
  createdBy: string;
  updatedBy: string;
  createDate: string;
  updateDate: string;
};
