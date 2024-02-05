import { ITeamsModel } from '../../Interfaces/ITeamsModel';
import MatchesModel from '../../database/models/matches/MatchesModel';
import { IMatches } from '../../Interfaces/matches/IMatches';
import { IMatchesModel } from '../../Interfaces/matches/IMatchesModel';
import { ServiceResponse } from '../../Interfaces/ServiceResponse';
import TeamsModel from '../../database/models/teams/TeamsModel';

type CreateParams = {
  homeTeamId: number;
  homeTeamGoals: number;
  awayTeamId: number;
  awayTeamGoals: number;
  inProgress: boolean;
};

export default class MatchesService {
  constructor(
    private matchesModel: IMatchesModel = new MatchesModel(),
    private teamsModel: ITeamsModel = new TeamsModel(),
  ) {}

  public async getAllMatches(inProgress?: boolean): Promise<ServiceResponse<IMatches[]>> {
    const matches = await this.matchesModel.getAllMatches(inProgress);

    return { status: 'SUCCESSFUL', data: matches };
  }

  public async findById(id: string): Promise<ServiceResponse<{ message: string }>> {
    await this.matchesModel.findById(id);
    return { status: 'SUCCESSFUL', data: { message: 'Finished' } };
  }

  public async getUpdatedMatch(id: string, goals: IMatches):
  Promise<ServiceResponse<{ message: string }>> {
    await this.matchesModel.getUptadedMatch(id, goals);

    return { status: 'SUCCESSFUL', data: { message: 'Updated' } };
  }

  public async createMatch(data: CreateParams): Promise<ServiceResponse<IMatches>> {
    const homeTeam = await this.teamsModel.getById(data.homeTeamId);
    const awayTeam = await this.teamsModel.getById(data.awayTeamId);

    if (data.homeTeamId === data.awayTeamId) {
      return {
        status: 'UNPROCESSABLE_ENTITY',
        data: { message: 'It is not possible to create a match with two equal teams' },
      };
    }

    if (!homeTeam || !awayTeam) {
      return { status: 'NOT_FOUND', data: { message: 'There is no team with such id!' } };
    }
    const created = await this.matchesModel.createMatch(data);

    return { status: 'CREATED', data: created };
  }
}
