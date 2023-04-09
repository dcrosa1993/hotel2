export type UserInput = {
  password: string;
  phone: string;
  name: string;
  email: string;
  baned: boolean;
  role: 'admin' | 'manager';
  changePassword: boolean;
};
