import { ITeams } from '../../../Interfaces/teams/ITeams';
import SequelizeTeams from './SequelizeTeams';
import { ITeamsModel } from '../../../Interfaces/teams/ITeamsModel';

export default class TeamsModel implements ITeamsModel {
  private model = SequelizeTeams;

  async findAll(): Promise<ITeams[]> {
    const getAll = await this.model.findAll();
    return getAll.map(({ id, teamName }) => ({ id, teamName }));
  }

  async getById(id: ITeams['id']): Promise<ITeams | null> {
    const getId = await this.model.findByPk(id);
    if (getId == null) return null;

    const { teamName }: ITeams = getId;
    return { id, teamName };
  }
}
