import { Request, Response } from 'express';
import MatchesService from '../services/matches/MatchesService';
import mapStatusHTTP from '../utils/mapStatusHttp';

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

  public async findById(req: Request, res: Response) {
    const { id } = req.params;
    const serviceResponse = await this.matchesService.findById(id);

    if (serviceResponse.status === 'NOT_FOUND') {
      return res.status(404).json(serviceResponse.data);
    }
    return res.status(200).json(serviceResponse.data);
  }

  public async getUpdatedMatch(req: Request, res: Response) {
    const { id } = req.params;
    const serviceResponse = await this.matchesService
      .getUpdatedMatch(id, req.body);
    return res.status(200).json(serviceResponse.data);
  }

  public async createMatch(req: Request, res: Response) {
    const { homeTeamId, homeTeamGoals, awayTeamId, awayTeamGoals, inProgress } = req.body;

    const { data, status } = await this.matchesService.createMatch({
      homeTeamId, homeTeamGoals, awayTeamId, awayTeamGoals, inProgress,
    });
    const statusCode = mapStatusHTTP(status);
    return res.status(statusCode).json(data);
  }
}
