import { NewEntity } from '../../../Interfaces/index';
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

  async findById(id: string): Promise<IMatches> {
    const matchUpdate = await this.model.findByPk(id);
    if (!matchUpdate) {
      throw new Error('Match not found');
    }
    if (matchUpdate.inProgress === false) {
      throw new Error('Match is not in progress');
    }

    await matchUpdate.update({ inProgress: false });
    return matchUpdate;
  }

  async getUptadedMatch(id: string, goals:
  { homeTeamGoals: number; awayTeamGoals: number }): Promise<IMatches> {
    const updatedGame = await this.model.findByPk(id);

    if (!updatedGame) {
      throw new Error('Match not found');
    }
    await updatedGame.update(goals);
    return updatedGame;
  }

  async createMatch(data: NewEntity<IMatches>): Promise<IMatches> {
    const created = await this.model.create({
      homeTeamId: data.homeTeamId,
      homeTeamGoals: data.homeTeamGoals,
      awayTeamId: data.awayTeamId,
      awayTeamGoals: data.awayTeamGoals,
      inProgress: data.inProgress ?? true,
    });
    return created.dataValues;
  }
}
