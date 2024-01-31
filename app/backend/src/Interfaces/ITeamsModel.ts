import { ITeams } from './ITeams';

export interface ITeamsModel {
  findAll(): Promise<ITeams[]>,
  getById(id: ITeams['id']): Promise<ITeams | null>,
}
