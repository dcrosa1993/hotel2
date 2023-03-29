import { Room } from '../models/exports';
import { RoomInput } from '../models/room/romm-input';
import { UserInput } from '../models/user/user-input';

export const room: Room = {
  createDate: '02/02/2022',
  updateDate: '02/02/2022',
  updatedBy: 'user',
  createdBy: 'user',
  id: '1',
  availability: true,
  capacity: '2',
  number: '425',
  reservationId: '1',
};

export const roomInput: RoomInput = {
  Number: '',
  Capacity: '',
  Availability: '',
};
export const rooms: Room[] = [
  {
    createDate: '02/02/2022',
    updateDate: '02/02/2022',
    updatedBy: 'user',
    createdBy: 'user',
    id: '1',
    availability: true,
    capacity: '2',
    number: '425',
    reservationId: '2',
  },
  {
    createDate: '02/02/2022',
    updateDate: '02/02/2022',
    updatedBy: 'user',
    createdBy: 'user',
    id: '2',
    availability: true,
    capacity: '2',
    number: '432',
    reservationId: '1',
  },
  {
    createDate: '02/02/2022',
    updateDate: '02/02/2022',
    updatedBy: 'user',
    createdBy: 'user',
    id: '3',
    availability: true,
    capacity: '2',
    number: '123',
    reservationId: '3',
  },
];
