import { IMatches } from './IMatches';

export interface IMatchesModel {
  getAllMatches(): Promise<IMatches[]>;
}
