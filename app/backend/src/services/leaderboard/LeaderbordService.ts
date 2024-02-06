import { ILeaderboardModel } from '../../Interfaces/leaderboard/ILeaderboardModel';
import LeaderboardModel from '../../database/models/leaderbord/LeaderboardModel';

export default class LeaderboardService {
  constructor(
    private leaderboardModel: ILeaderboardModel = new LeaderboardModel(),
  ) {}

  public async getLeaderboard() {
    const leader = await this.leaderboardModel.getLeaderboard();
    return { status: 'SUCCESSFUL', data: leader };
  }
}
