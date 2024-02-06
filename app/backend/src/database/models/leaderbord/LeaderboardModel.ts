import calculateLeaderboard from '../../../utils/board';
import { ILeaderboard } from '../../../Interfaces/leaderboard/ILeaderboard';
import SequelizeMatches from '../matches/SequelizeMatches';
import SequelizeTeams from '../teams/SequelizeTeams';
import { ILeaderboardModel } from '../../../Interfaces/leaderboard/ILeaderboardModel';

export default class LeaderboardModel implements ILeaderboardModel {
  constructor(
    private matches = SequelizeMatches,
    private teams = SequelizeTeams,

  ) {}

  async getLeaderboard(): Promise<ILeaderboard[]> {
    const teams = await this.teams.findAll();
    const matches = await this.matches.findAll({
      where: { inProgress: false },
      include: [
        { association: 'homeTeam', attributes: ['teamName'] },
        { association: 'awayTeam', attributes: ['teamName'] },
      ],
    });
    const leaderboard = teams.map((team) => calculateLeaderboard(matches, team));
    return leaderboard;
  }
}
