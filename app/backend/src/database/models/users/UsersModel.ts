import { IUsers } from '../../../Interfaces/users/IUsers';
import SequelizeUsers from './SequelizeUsers';
import { IUsersModel } from '../../../Interfaces/users/IUsersModel';

export default class UsersModel implements IUsersModel<IUsers> {
  private model = SequelizeUsers;

  async findByEmail(email: string): Promise<IUsers | null> {
    const user = await this.model.findOne({ where: { email } });
    return user;
  }
}
