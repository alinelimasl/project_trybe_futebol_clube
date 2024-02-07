import { ITeams } from '../Interfaces/teams/ITeams';
import { ILeaderboard } from '../Interfaces/leaderboard/ILeaderboard';
import { IMatches } from '../Interfaces/matches/IMatches';
import {
  calculatePoints,
  calculateGames,
  calculateTotalVictories,
  calculateTotalDraws,
  calculateTotalLosses,
  calculateGoalsFavor,
  calculateGoalsOwn,
  calculateGoalsBalance,
  calculateEfficiency,
} from './calculate';

export default function calculateAwayTeamStats(matches: IMatches[], team: ITeams): ILeaderboard {
  return {
    name: team.teamName,
    totalPoints: calculatePoints(matches, team.id, 'Away'),
    totalGames: calculateGames(matches, team.id, 'Away'),
    totalVictories: calculateTotalVictories(matches, team.id, 'Away'),
    totalDraws: calculateTotalDraws(matches, team.id, 'Away'),
    totalLosses: calculateTotalLosses(matches, team.id, 'Away'),
    goalsFavor: calculateGoalsFavor(matches, team.id, 'Away'),
    goalsOwn: calculateGoalsOwn(matches, team.id, 'Away'),
    goalsBalance: calculateGoalsBalance(matches, team.id, 'Away'),
    efficiency: calculateEfficiency(team.id, matches, 'Away'),
  };
}
