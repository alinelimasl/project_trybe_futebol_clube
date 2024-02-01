import * as bcrypt from 'bcryptjs';
import * as jwt from 'jsonwebtoken';
import { IUsersModel } from '../../Interfaces/users/IUsersModel';
import { ServiceResponse } from '../../Interfaces/ServiceResponse';
import UsersModel from '../../database/models/users/UsersModel';

export type IUsersToken = {
  token: string,
};
type UserResponse = ServiceResponse<IUsersToken>;

export default class UsersService {
  constructor(
    private usersModel: IUsersModel = new UsersModel(),
  ) {}

  public async usersLogin(email: string, password: string): Promise<UserResponse> {
    const user = await this.usersModel.findByEmail(email);

    if (!user) return { status: 'UNAUTHORIZED', data: { message: 'Invalid email or password' } };

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return {
        status: 'UNAUTHORIZED', data: { message: 'Invalid email or password' } };
    }

    const payload = { sub: user.id, username: user.username, role: user.role };
    const secret = process.env.JWT_SECRET ?? 'jwt_secret';

    const token = jwt.sign(payload, secret, { expiresIn: '10d' });
    return { status: 'SUCCESSFUL', data: { token } };
  }
}
