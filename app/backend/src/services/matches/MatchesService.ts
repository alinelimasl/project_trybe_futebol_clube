import MatchesModel from '../../database/models/matches/MatchesModel';
import { IMatches } from '../../Interfaces/matches/IMatches';
import { IMatchesModel } from '../../Interfaces/matches/IMatchesModel';
import { ServiceResponse } from '../../Interfaces/ServiceResponse';

export default class MatchesService {
  constructor(
    private matchesModel: IMatchesModel = new MatchesModel(),
  ) {}

  public async getAllMatches(inProgress?: boolean): Promise<ServiceResponse<IMatches[]>> {
    const matches = await this.matchesModel.getAllMatches(inProgress);

    return { status: 'SUCCESSFUL', data: matches };
  }

  public async findById(id: string): Promise<ServiceResponse<{ message: string }>> {
    await this.matchesModel.findById(id);
    return { status: 'SUCCESSFUL', data: { message: 'Finished' } };
  }
}
