import { User } from "./user";

export type UserAccess = {
    id: string;
    description:string;
    users:User[]
  };