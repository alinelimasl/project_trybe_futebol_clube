import { Request, Response } from 'express';
import MatchesService from '../services/matches/MatchesService';

export default class MatchesController {
  constructor(
    private matchesService: MatchesService = new MatchesService(),
  ) { }

  public async getAllMatches(_req: Request, res: Response) {
    const serviceResponse = await this.matchesService.getAllMatches();
    return res.status(200).json(serviceResponse.data);
  }
}
