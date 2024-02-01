import { Request, Response } from 'express';
import TeamsService from '../services/TeamsService';
import mapStatusHTTP from '../utils/mapStatusHttp';

export default class TeamsController {
  constructor(
    private teamsService: TeamsService = new TeamsService(),
  ) { }

  public async findAll(_req: Request, res: Response) {
    const ServiceResponse = await this.teamsService.findAll();
    return res.status(200).json(ServiceResponse.data);
  }

  public async getById(req: Request, res: Response) {
    const { id } = req.params;
    const serviceResponse = await this.teamsService.getById(Number(id));

    if (serviceResponse.status !== 'SUCCESSFUL') {
      return res.status(mapStatusHTTP(serviceResponse.status)).json(serviceResponse.data);
    }

    res.status(200).json(serviceResponse.data);
  }
}
