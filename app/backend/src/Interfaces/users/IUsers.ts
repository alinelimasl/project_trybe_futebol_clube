export interface IUsers {
  id: number,
  username: string,
  role: string,
  email: string,
  password: string,
}

export interface IUsersToken {
  token: string,
}

export type IUserResponse = Omit<IUsers, 'password'>;
