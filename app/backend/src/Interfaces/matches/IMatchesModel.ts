import { IMatches } from './IMatches';
import { NewEntity } from '../index';

export interface IMatchesModel {
  getAllMatches(inProgress?: boolean): Promise<IMatches[]>;
  findById(id: string): Promise<IMatches>;
  getUptadedMatch(id: string, goals: IMatches): Promise<IMatches>;
  createMatch(data: NewEntity<IMatches>): Promise<IMatches>;
}
