import { Request, Response } from 'express';
import TeamsService from '../services/TeamsService';
import mapStatusHTTP from '../utils/mapStatusHttp';

export default class TeamsController {
  constructor(
    private teamsService: TeamsService = new TeamsService(),
  ) { }

  public async findAll(req: Request, res: Response) {
    const { status, data } = await this.teamsService.findAll();
    return res.status(mapStatusHTTP(status)).json(data);
  }

  public async getById(req: Request, res: Response) {
    const { id } = req.params;
    const { status, data } = await this.teamsService.findById(Number(id));
    res.status(mapStatusHTTP(status)).json(data);

    // public async create(req: Request, res: Response) {
    //   const serviceResponse = await this.teamsService.create(req.body);
    //   return res.status(201).json(serviceResponse.data);
    // }
  }
}
