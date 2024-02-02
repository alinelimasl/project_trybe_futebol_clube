import { IMatches } from '../../Interfaces/matches/IMatches';
import { IMatchesModel } from '../../Interfaces/matches/IMatchesModel';
import MatchesModel from '../../database/models/matches/MatchesModel';
import { ServiceResponse } from '../../Interfaces/ServiceResponse';

export default class MatchesService {
  constructor(
    private matchesModel: IMatchesModel = new MatchesModel(),
  ) {}

  public async getAllMatches(): Promise<ServiceResponse<IMatches[]>> {
    const matches = await this.matchesModel.getAllMatches();

    return { status: 'SUCCESSFUL', data: matches };
  }
}
