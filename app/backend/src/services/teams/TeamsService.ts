import TeamsModel from '../../database/models/teams/TeamsModel';
import { ITeams } from '../../Interfaces/teams/ITeams';
import { ITeamsModel } from '../../Interfaces/teams/ITeamsModel';
import { ServiceResponse } from '../../Interfaces/ServiceResponse';

export default class TeamsService {
  constructor(
    private teamsModel: ITeamsModel = new TeamsModel(),
  ) { }

  public async findAll(): Promise<ServiceResponse<ITeams[]>> {
    const teams = await this.teamsModel.findAll();
    return { status: 'SUCCESSFUL', data: teams };
  }

  public async getById(id: number): Promise<ServiceResponse<ITeams | null>> {
    const team = await this.teamsModel.getById(id);
    if (!team) {
      return { status: 'NOT_FOUND', data: { message: 'Team not found' } };
    }
    return { status: 'SUCCESSFUL', data: team };
  }
}
