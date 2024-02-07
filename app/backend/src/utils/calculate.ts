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

function calculateGoalsFavor(
  matches: IMatches[],
  teamId: number,
  homeOrAway: 'Home' | 'Away',
): number {
  return matches.reduce((totalGoals, match) => {
    if ((homeOrAway === 'Home' && match.homeTeamId === teamId)
          || (homeOrAway === 'Away' && match.awayTeamId === teamId)) {
      return totalGoals + (homeOrAway === 'Home' ? match.homeTeamGoals : match.awayTeamGoals);
    }
    return totalGoals;
  }, 0);
}

function calculateGoalsOwn(
  matches: IMatches[],
  teamId: number,
  homeOrAway: 'Home' | 'Away',
): number {
  return matches.reduce((totalGoals, match) => {
    if ((homeOrAway === 'Home' && match.homeTeamId === teamId)
          || (homeOrAway === 'Away' && match.awayTeamId === teamId)) {
      return totalGoals + (homeOrAway === 'Home' ? match.awayTeamGoals : match.homeTeamGoals);
    }
    return totalGoals;
  }, 0);
}

function calculateGoalsBalance(
  matches: IMatches[],
  teamId: number,
  homeOrAway: 'Home' | 'Away',
): number {
  if (homeOrAway === 'Home') {
    return calculateGoalsFavor(matches, teamId, 'Home')
        - calculateGoalsOwn(matches, teamId, 'Home');
  }
  return calculateGoalsFavor(matches, teamId, 'Away')
      - calculateGoalsOwn(matches, teamId, 'Away');
}

function calculateEfficiency(id: number, matches: IMatches[], awayOrHome: 'Home' | 'Away'
| 'Total'): string {
  const calculate = (points: number, games: number): string =>
    ((points / (games * 3)) * 100).toFixed(2);

  if (awayOrHome === 'Total') {
    const totalHome = calculateGames(matches, id, 'Home');
    const totalAway = calculateGames(matches, id, 'Away');
    return calculate(
      calculatePoints(matches, id, 'Home') + calculatePoints(matches, id, 'Away'),
      totalHome + totalAway,
    );
  }

  const points = awayOrHome === 'Home' ? calculatePoints(matches, id, 'Home')
    : calculatePoints(matches, id, 'Away');
  const games = awayOrHome === 'Home' ? calculateGames(matches, id, 'Home')
    : calculateGames(matches, id, 'Away');

  return calculate(points, games);
}

function calculateTotalVictories(
  matches: IMatches[],
  teamId: number,
  homeOrAway: 'Home' | 'Away',
): number {
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
function calculateTotalDraws(matches: IMatches[], teamId:
number, homeOrAway: 'Home' | 'Away'): number {
  return matches.reduce((totalDraws, match) => {
    const isHomeMatch = homeOrAway === 'Home' && match.homeTeamId === teamId;
    const isAwayMatch = homeOrAway === 'Away' && match.awayTeamId === teamId;

    if (match.homeTeamGoals === match.awayTeamGoals && (isHomeMatch || isAwayMatch)) {
      return totalDraws + 1;
    }

    return totalDraws;
  }, 0);
}

function calculateTotalLosses(matches: IMatches[], teamId: number, homeOrAway:
'Home' | 'Away'): number {
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

export {
  calculatePoints,
  calculateGames,
  calculateGoalsFavor,
  calculateGoalsOwn,
  calculateGoalsBalance,
  calculateEfficiency,
  calculateTotalVictories,
  calculateTotalDraws,
  calculateTotalLosses,
};
