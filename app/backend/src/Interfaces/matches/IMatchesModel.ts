import { IMatches } from './IMatches';

export interface IMatchesModel {
  getAllMatches(inProgress?: boolean): Promise<IMatches[]>;
  findById(id: string): Promise<IMatches>;
}
