import calculateHomeTeamStats from '../../../utils/boardHome';
import { ILeaderboard } from '../../../Interfaces/leaderboard/ILeaderboard';
import SequelizeMatches from '../matches/SequelizeMatches';
import SequelizeTeams from '../teams/SequelizeTeams';
import { ILeaderboardModel } from '../../../Interfaces/leaderboard/ILeaderboardModel';
import calculateAwayTeamStats from '../../../utils/boardAway';

export default class LeaderboardModel implements ILeaderboardModel {
  constructor(
    private matches = SequelizeMatches,
    private teams = SequelizeTeams,

  ) {}

  async getLeaderboard(): Promise<ILeaderboard[]> {
    const teams = await this.teams.findAll();
    const matches = await this.matches.findAll({ where: { inProgress: false } });

    const homeStatsPromises = teams.map((team) => calculateHomeTeamStats(matches, team));

    const homeStats = await Promise.all(homeStatsPromises);

    const sortedHomeStats = homeStats.sort((a, b) => {
      if (a.totalPoints !== b.totalPoints) return b.totalPoints - a.totalPoints;
      if (a.totalVictories !== b.totalVictories) return b.totalVictories - a.totalVictories;
      if (a.goalsBalance !== b.goalsBalance) return b.goalsBalance - a.goalsBalance;
      return b.goalsFavor - a.goalsFavor;
    });
    return sortedHomeStats;
  }

  public async getAwayTeam() {
    const teams = await this.teams.findAll();
    const matches = await this.matches.findAll({ where: { inProgress: false } });
    const awayStatsPromises = teams.map((team) => calculateAwayTeamStats(matches, team));
    const awayStats = await Promise.all(awayStatsPromises);

    const sortedAwayStats = awayStats.sort((c, d) => {
      if (c.totalPoints !== d.totalPoints) return d.totalPoints - c.totalPoints;
      if (c.totalVictories !== d.totalVictories) return d.totalVictories - c.totalVictories;
      if (c.goalsBalance !== d.goalsBalance) return d.goalsBalance - c.goalsBalance;
      return d.goalsFavor - c.goalsFavor;
    });
    return sortedAwayStats;
  }
}
