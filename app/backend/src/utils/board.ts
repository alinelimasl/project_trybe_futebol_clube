import { ITeams } from '../Interfaces/teams/ITeams';
import { ILeaderboard } from '../Interfaces/leaderboard/ILeaderboard';
import { IMatches } from '../Interfaces/matches/IMatches';

function calculateTotalPoints(matches: IMatches[]): Map<number, number> {
  const pointsMap: Map<number, number> = new Map();
  matches.forEach((match) => {
    if (match.homeTeamGoals > match.awayTeamGoals) {
      pointsMap.set(match.homeTeamId, (pointsMap.get(match.homeTeamId) || 0) + 3);
    } else if (match.homeTeamGoals < match.awayTeamGoals) {
      pointsMap.set(match.awayTeamId, (pointsMap.get(match.awayTeamId) || 0) + 3);
    } else {
      pointsMap.set(match.homeTeamId, (pointsMap.get(match.homeTeamId) || 0) + 1);
      pointsMap.set(match.awayTeamId, (pointsMap.get(match.awayTeamId) || 0) + 1);
    }
  });
  return pointsMap;
}

function calculateTotalGames(matches: IMatches[]): Map<number, number> {
  const gamesMap: Map<number, number> = new Map();
  matches.forEach((match) => {
    gamesMap.set(match.homeTeamId, (gamesMap.get(match.homeTeamId) || 0) + 1);
    gamesMap.set(match.awayTeamId, (gamesMap.get(match.awayTeamId) || 0) + 1);
  });
  return gamesMap;
}

function calculateTotalVictories(matches: IMatches[], teamId: number): number {
  return matches.reduce((totalVictories, match) => {
    if (match.homeTeamId === teamId && match.homeTeamGoals > match.awayTeamGoals) {
      return totalVictories + 1;
    } if (match.awayTeamId === teamId && match.awayTeamGoals > match.homeTeamGoals) {
      return totalVictories + 1;
    }
    return totalVictories;
  }, 0);
}

function calculateTotalDraws(matches: IMatches[], teamId: number): number {
  return matches.reduce((totalDraws, match) => {
    if (match.homeTeamId === teamId && match.homeTeamGoals === match.awayTeamGoals) {
      return totalDraws + 1;
    } if (match.awayTeamId === teamId && match.awayTeamGoals === match.homeTeamGoals) {
      return totalDraws + 1;
    }
    return totalDraws;
  }, 0);
}

function calculateTotalLosses(matches: IMatches[], teamId: number): number {
  return matches.reduce((totalLosses, match) => {
    if (match.homeTeamId === teamId && match.homeTeamGoals < match.awayTeamGoals) {
      return totalLosses + 1;
    } if (match.awayTeamId === teamId && match.awayTeamGoals < match.homeTeamGoals) {
      return totalLosses + 1;
    }
    return totalLosses;
  }, 0);
}

function calculateGoalsFavor(matches: IMatches[], teamId: number): number {
  return matches.reduce((totalGoals, match) => {
    if (match.homeTeamId === teamId) {
      return totalGoals + match.homeTeamGoals;
    } if (match.awayTeamId === teamId) {
      return totalGoals + match.awayTeamGoals;
    }
    return totalGoals;
  }, 0);
}

function calculateGoalsOwn(matches: IMatches[], teamId: number): number {
  return matches.reduce((totalGoals, match) => {
    if (match.homeTeamId === teamId) {
      return totalGoals + match.awayTeamGoals;
    } if (match.awayTeamId === teamId) {
      return totalGoals + match.homeTeamGoals;
    }
    return totalGoals;
  }, 0);
}

function calculateGoalsBalance(matches: IMatches[], teamId: number): number {
  return calculateGoalsFavor(matches, teamId) - calculateGoalsOwn(matches, teamId);
}

function calculateEfficiency(points: number, games: number): string {
  return ((points / (games * 3)) * 100).toFixed(2);
}

export default function calculateLeaderboard(matches: IMatches[], teams: ITeams): ILeaderboard {
  const teamMatches = matches.filter((match) => match.homeTeamId === teams.id
  || match.awayTeamId === teams.id);
  const teamTotalPoints = calculateTotalPoints(teamMatches).get(teams.id) || 0;
  const teamTotalGames = calculateTotalGames(teamMatches).get(teams.id) || 0;

  return {
    name: teams.teamName,
    totalPoints: teamTotalPoints,
    totalGames: teamTotalGames,
    totalVictories: calculateTotalVictories(teamMatches, teams.id),
    totalDraws: calculateTotalDraws(teamMatches, teams.id),
    totalLosses: calculateTotalLosses(teamMatches, teams.id),
    goalsFavor: calculateGoalsFavor(teamMatches, teams.id),
    goalsOwn: calculateGoalsOwn(teamMatches, teams.id),
    goalsBalance: calculateGoalsBalance(teamMatches, teams.id),
    efficiency: calculateEfficiency(teamTotalPoints, teamTotalGames),
  };
}
