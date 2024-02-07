import { Request, Response } from 'express';
import LeaderboardService from '../services/leaderboard/LeaderbordService';

export default class LeaderboardController {
  constructor(
    private leaderboardService: LeaderboardService = new LeaderboardService(),
  ) {}

  public async getLeaderboard(req: Request, res: Response) {
    const serviceResponse = await this.leaderboardService.getLeaderboard();
    return res.status(200).json(serviceResponse.data);
  }

  // public async getHomeTeam(req: Request, res: Response) {
  //   const serviceResponse = await this.leaderboardService.getHomeTeam();
  //   return res.status(200).json(serviceResponse.data);
  // }
}
