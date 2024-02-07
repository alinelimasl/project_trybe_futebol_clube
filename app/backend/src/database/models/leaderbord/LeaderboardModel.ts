/* eslint-disable max-lines-per-function */
import { calculateHomeTeamStats } from '../../../utils/board';
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
    const matches = await this.matches.findAll({ where: { inProgress: false } });

    const homeStatsPromises = teams.map((team) => calculateHomeTeamStats(matches, team));
    // const awayStatsPromises = teams.map((team) => calculateAwayTeamStats(matches, team));

    const homeStats = await Promise.all(homeStatsPromises);
    // const awayStats = await Promise.all(awayStatsPromises);

    const sortedHomeStats = homeStats.sort((a, b) => {
      if (a.totalPoints !== b.totalPoints) return b.totalPoints - a.totalPoints;
      if (a.totalVictories !== b.totalVictories) return b.totalVictories - a.totalVictories;
      if (a.goalsBalance !== b.goalsBalance) return b.goalsBalance - a.goalsBalance;
      return b.goalsFavor - a.goalsFavor;
    });
    return sortedHomeStats;
  }
}
