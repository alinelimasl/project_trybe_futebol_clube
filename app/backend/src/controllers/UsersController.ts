import { Request, Response } from 'express';
import UsersService from '../services/users/UsersService';
import mapStatusHTTP from '../utils/mapStatusHttp';

export default class UsersController {
  constructor(
    private usersService: UsersService = new UsersService(),
  ) { }

  async login(req: Request, res: Response) {
    const { email, password } = req.body;

    const { status, data } = await this.usersService.usersLogin(email, password);
    const statusCode = mapStatusHTTP(status);

    return res.status(statusCode).json(data);
  }
}
