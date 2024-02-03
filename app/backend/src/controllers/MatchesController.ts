import { Request, Response } from 'express';
import MatchesService from '../services/matches/MatchesService';

export default class MatchesController {
  constructor(
    private matchesService: MatchesService = new MatchesService(),
  ) { }

  public async getAllMatches(req: Request, res: Response) {
    const inProgressMatches = req.query.inProgress;
    let inProgress: boolean | undefined;
    if (typeof inProgressMatches === 'string') {
      inProgress = inProgressMatches === 'true';
    }
    const serviceResponse = await this.matchesService.getAllMatches(inProgress);

    return res.status(200).json(serviceResponse.data);
  }
}
