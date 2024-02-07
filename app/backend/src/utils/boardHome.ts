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
  calculateEfficiency } from './calculate';

export default function calculateHomeTeamStats(matches: IMatches[], team: ITeams): ILeaderboard {
  return {
    name: team.teamName,
    totalPoints: calculatePoints(matches, team.id, 'Home'),
    totalGames: calculateGames(matches, team.id, 'Home'),
    totalVictories: calculateTotalVictories(matches, team.id, 'Home'),
    totalDraws: calculateTotalDraws(matches, team.id, 'Home'),
    totalLosses: calculateTotalLosses(matches, team.id, 'Home'),
    goalsFavor: calculateGoalsFavor(matches, team.id, 'Home'),
    goalsOwn: calculateGoalsOwn(matches, team.id, 'Home'),
    goalsBalance: calculateGoalsBalance(matches, team.id, 'Home'),
    efficiency: calculateEfficiency(team.id, matches, 'Home'),
  };
}
