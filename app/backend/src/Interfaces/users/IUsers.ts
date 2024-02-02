import { Identifiable } from '..';

export interface ILogin extends Identifiable{
  email: string;
  password: string;
}

export interface IUser extends Identifiable, ILogin {
  name: string;
}

export type UserType = Identifiable & ILogin & {
  username: string;
  role: string;
};

export type IUserResponse = Omit<IUser, 'password'>;
