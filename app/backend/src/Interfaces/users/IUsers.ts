import { Identifiable } from '..';

export interface ILogin extends Identifiable{
  email: string;
  password: string;
}

export interface IUsers extends Identifiable, ILogin {
  username: string;
  role: string;
}

export type UserType = Identifiable & ILogin & {
  username: string;
  role: string;
};

export type IUserResponse = Omit<IUsers, 'password'>;
