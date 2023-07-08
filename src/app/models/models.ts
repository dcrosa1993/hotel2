export interface AuditableBaseEntity {
    createdTime: Date;
    updatedTime?: Date | null;
    createdBy: string;
    updatedBy: string;
}

export interface Room extends AuditableBaseEntity {
    id: number;
    number: string;
    capacity: number;
    availability: boolean;
    reservations: Reservation[];
}

export interface Client extends AuditableBaseEntity {
    id: number;
    name: string;
    passport: string;
    email: string;
    phone: string;
    age: string;
    reservations: Reservation[];
}

export interface Reservation extends AuditableBaseEntity {
    id: number;
    noClients: number;
    description: string;
    dateIn: Date;
    dateOut: Date;
    costPerClient: number;
    discount: number;
    totalNights: number;
    paymentNights: number;
    management: number;
    transport: number;
    advanceManagement: boolean;
    user: User;
    room: Room | null;
    clients: Client[];
}

export interface ReservationConfiguration extends AuditableBaseEntity {
    id: number;
    advanceRequieredNigth: number;
    nigthCostUnder2Client: number;
    nigthCostFor3Client: number;
    nigthCostMost4Client: number;
    nigthDiscountUnder2Client: number;
    nigthDiscountFor3Client: number;
    nigthDiscountMost4Client: number;
    maxRoomClients: number;
    transportCost: number;
    managerPartPerClient: number;
}

export interface User extends AuditableBaseEntity {
    id: number;
    name: string;
    email: string;
    password: string;
    phone: string;
    role: string;
    baned: boolean;
    userAccess: UserAccess[];
    changePassword: boolean;
    reservations: Reservation[];
}

export interface UserAccess extends AuditableBaseEntity {
    id: number;
    description: string;
    users?: User[];
}
  

  