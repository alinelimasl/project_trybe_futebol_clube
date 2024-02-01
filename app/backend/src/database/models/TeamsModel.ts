import { ITeams } from '../../Interfaces/ITeams';
import SequelizeTeams from './SequelizeTeams';
import { ITeamsModel } from '../../Interfaces/ITeamsModel';

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
