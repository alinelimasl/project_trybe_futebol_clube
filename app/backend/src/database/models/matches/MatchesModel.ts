import { IMatches } from '../../../Interfaces/matches/IMatches';
import { IMatchesModel } from '../../../Interfaces/matches/IMatchesModel';
import SequelizeMatches from './SequelizeMatches';

export default class MatchesModel implements IMatchesModel {
  private model = SequelizeMatches;

  async getAllMatches(inProgress?: boolean): Promise<IMatches[]> {
    const getAll = await this.model.findAll({
      include: [
        { association: 'homeTeam', attributes: ['teamName'] },
        { association: 'awayTeam', attributes: ['teamName'] },
      ],
    });
    if (inProgress !== undefined) {
      return getAll.filter((match) => match.inProgress === inProgress);
    }

    return getAll;
  }
}
