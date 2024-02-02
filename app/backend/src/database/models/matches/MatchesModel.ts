import { IMatches } from '../../../Interfaces/matches/IMatches';
import { IMatchesModel } from '../../../Interfaces/matches/IMatchesModel';
import SequelizeMatches from './SequelizeMatches';

export default class MatchesModel implements IMatchesModel {
  private model = SequelizeMatches;

  async getAllMatches(): Promise<IMatches[]> {
    const getAll = await this.model.findAll({
      include: [
        { association: 'homeTeam', attributes: ['teamName'] },
        { association: 'awayTeam', attributes: ['teamName'] },
      ],
    });

    return getAll;
  }
}
