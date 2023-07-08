import { client, clientInput } from '../exports';

export type checkInInput = {
  id: string;
  dateIn: string;
  dateOut: string;
  roomId: string;
};
