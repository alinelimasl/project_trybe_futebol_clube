/* eslint-disable max-lines-per-function */
/* eslint-disable max-len */
import { ITeams } from '../Interfaces/teams/ITeams';
import { ILeaderboard } from '../Interfaces/leaderboard/ILeaderboard';
import { IMatches } from '../Interfaces/matches/IMatches';

function calculatePoints(matches: IMatches[], teamId: number, homeOrAway: 'Home' | 'Away'): number {
  return matches.reduce((totalPoints, match) => {
    const isHomeMatch = homeOrAway === 'Home' && match.homeTeamId === teamId;
    const isAwayMatch = homeOrAway === 'Away' && match.awayTeamId === teamId;

    if (isHomeMatch || isAwayMatch) {
      if ((isHomeMatch && match.homeTeamGoals > match.awayTeamGoals)
          || (isAwayMatch && match.awayTeamGoals > match.homeTeamGoals)) {
        return totalPoints + 3;
      } if (match.homeTeamGoals === match.awayTeamGoals) {
        return totalPoints + 1;
      }
    }

    return totalPoints;
  }, 0);
}

function calculateGames(matches: IMatches[], teamId: number, homeOrAway: 'Home' | 'Away'): number {
  return matches.filter((match) => (homeOrAway === 'Home' && match.homeTeamId === teamId)
|| (homeOrAway === 'Away' && match.awayTeamId === teamId)).length;
}

function calculateGoalsFavor(matches: IMatches[], teamId: number, homeOrAway: 'Home' | 'Away'): number {
  return matches.reduce((totalGoals, match) => {
    if ((homeOrAway === 'Home' && match.homeTeamId === teamId)
        || (homeOrAway === 'Away' && match.awayTeamId === teamId)) {
      return totalGoals + (homeOrAway === 'Home' ? match.homeTeamGoals : match.awayTeamGoals);
    }
    return totalGoals;
  }, 0);
}

function calculateGoalsOwn(matches: IMatches[], teamId: number, homeOrAway: 'Home' | 'Away'): number {
  return matches.reduce((totalGoals, match) => {
    if ((homeOrAway === 'Home' && match.homeTeamId === teamId)
        || (homeOrAway === 'Away' && match.awayTeamId === teamId)) {
      return totalGoals + (homeOrAway === 'Home' ? match.awayTeamGoals : match.homeTeamGoals);
    }
    return totalGoals;
  }, 0);
}

function calculateGoalsBalance(matches: IMatches[], teamId: number, homeOrAway: 'Home' | 'Away'): number {
  if (homeOrAway === 'Home') {
    return calculateGoalsFavor(matches, teamId, 'Home')
      - calculateGoalsOwn(matches, teamId, 'Home');
  }
  return calculateGoalsFavor(matches, teamId, 'Away')
    - calculateGoalsOwn(matches, teamId, 'Away');
}

function calculateEfficiency(id: number, matches: IMatches[], awayOrHome: 'Home' | 'Away' | 'Total'): string {
  function calculate(points: number, games: number): string {
    return ((points / (games * 3)) * 100).toFixed(2);
  }
  if (awayOrHome === 'Total') {
    const totalHome = calculateGames(matches, id, 'Home');
    const totalAway = calculateGames(matches, id, 'Away');
    const total = totalHome + totalAway;
    const points = calculatePoints(matches, id, 'Home') + calculatePoints(matches, id, 'Away');
    return calculate(points, total);
  }
  if (awayOrHome === 'Home') {
    const points = calculatePoints(matches, id, 'Home');
    const games = calculateGames(matches, id, 'Home');
    return calculate(points, games);
  }
  const points = calculatePoints(matches, id, 'Away');
  const games = calculateGames(matches, id, 'Away');
  return calculate(points, games);
}

function calculateTotalVictories(matches: IMatches[], teamId: number, homeOrAway: 'Home' | 'Away'): number {
  return matches.reduce((totalVictories, match) => {
    const isHomeMatch = homeOrAway === 'Home' && match.homeTeamId === teamId;
    const isAwayMatch = homeOrAway === 'Away' && match.awayTeamId === teamId;

    if ((isHomeMatch && match.homeTeamGoals > match.awayTeamGoals)
        || (isAwayMatch && match.awayTeamGoals > match.homeTeamGoals)) {
      return totalVictories + 1;
    }

    return totalVictories;
  }, 0);
}
function calculateTotalDraws(matches: IMatches[], teamId: number, homeOrAway: 'Home' | 'Away'): number {
  return matches.reduce((totalDraws, match) => {
    const isHomeMatch = homeOrAway === 'Home' && match.homeTeamId === teamId;
    const isAwayMatch = homeOrAway === 'Away' && match.awayTeamId === teamId;

    if (match.homeTeamGoals === match.awayTeamGoals && (isHomeMatch || isAwayMatch)) {
      return totalDraws + 1;
    }

    return totalDraws;
  }, 0);
}

function calculateTotalLosses(matches: IMatches[], teamId: number, homeOrAway: 'Home' | 'Away'): number {
  return matches.reduce((totalLosses, match) => {
    const isHomeMatch = homeOrAway === 'Home' && match.homeTeamId === teamId;
    const isAwayMatch = homeOrAway === 'Away' && match.awayTeamId === teamId;

    if ((isHomeMatch && match.homeTeamGoals < match.awayTeamGoals)
        || (isAwayMatch && match.awayTeamGoals < match.homeTeamGoals)) {
      return totalLosses + 1;
    }

    return totalLosses;
  }, 0);
}

function calculateHomeTeamStats(matches: IMatches[], team: ITeams): ILeaderboard {
  const homeMatches = matches.filter((match) => match.homeTeamId === team.id);
  const totalPoints = calculatePoints(homeMatches, team.id, 'Home');
  const totalGames = calculateGames(homeMatches, team.id, 'Home');
  const totalVictories = calculateTotalVictories(homeMatches, team.id, 'Home');
  const totalDraws = calculateTotalDraws(homeMatches, team.id, 'Home');
  const totalLosses = calculateTotalLosses(homeMatches, team.id, 'Home');
  const goalsFavor = calculateGoalsFavor(homeMatches, team.id, 'Home');
  const goalsOwn = calculateGoalsOwn(homeMatches, team.id, 'Home');
  const goalsBalance = calculateGoalsBalance(homeMatches, team.id, 'Home');
  const efficiency = calculateEfficiency(team.id, homeMatches, 'Home');

  return {
    name: team.teamName,
    totalPoints,
    totalGames,
    totalVictories,
    totalDraws,
    totalLosses,
    goalsFavor,
    goalsOwn,
    goalsBalance,
    efficiency,
  };
}

function calculateAwayTeamStats(matches: IMatches[], team: ITeams): ILeaderboard {
  const awayMatches = matches.filter((match) => match.awayTeamId === team.id);
  const totalPoints = calculatePoints(awayMatches, team.id, 'Away');
  const totalGames = calculateGames(awayMatches, team.id, 'Away');
  const totalVictories = calculateTotalVictories(awayMatches, team.id, 'Away');
  const totalDraws = calculateTotalDraws(awayMatches, team.id, 'Away');
  const totalLosses = calculateTotalLosses(awayMatches, team.id, 'Away');
  const goalsFavor = calculateGoalsFavor(awayMatches, team.id, 'Away');
  const goalsOwn = calculateGoalsOwn(awayMatches, team.id, 'Away');
  const goalsBalance = calculateGoalsBalance(awayMatches, team.id, 'Away');
  const efficiency = calculateEfficiency(team.id, awayMatches, 'Away');

  return {
    name: team.teamName,
    totalPoints,
    totalGames,
    totalVictories,
    totalDraws,
    totalLosses,
    goalsFavor,
    goalsOwn,
    goalsBalance,
    efficiency,
  };
}

export { calculateHomeTeamStats, calculateAwayTeamStats };
