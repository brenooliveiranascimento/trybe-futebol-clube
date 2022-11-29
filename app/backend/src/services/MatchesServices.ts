import { IAddMatches, IMatches } from '../interface/IMatches';
import Matches from '../database/models/MatchesModel';
import Teams from '../database/models/TeamsModel';

export default class MatchesService {
  constructor(private matchesModel = Matches) {}

  async getAll(): Promise<IMatches[]> {
    const matches = await this.matchesModel.findAll({
      include: [
        { model: Teams, as: 'teamHome', attributes: { exclude: ['id'] } },
        { model: Teams, as: 'teamAway', attributes: { exclude: ['id'] } },
      ],
    });
    return matches;
  }

  async getAllFilted(inProgress: boolean): Promise<IMatches[]> {
    console.log(inProgress);
    const matches = await this.matchesModel.findAll({
      where: { inProgress },
      include: [
        { model: Teams, as: 'teamHome', attributes: { exclude: ['id'] } },
        { model: Teams, as: 'teamAway', attributes: { exclude: ['id'] } },
      ],
    });

    return matches;
  }

  async addMatch(matchData: IAddMatches): Promise<IAddMatches> {
    const add = await this.matchesModel.create({
      ...matchData, inProgress: true,
    });
    return add;
  }

  async finished(id: number) {
    const add = await this.matchesModel.update(
      { inProgress: true },
      { where: { id } },
    );
    return add;
  }
}
