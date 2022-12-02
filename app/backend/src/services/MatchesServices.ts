import { ITeams } from '../interface/ITeams';
import { IAddMatches, IMatches, IUpdateMatches } from '../interface/IMatches';
import Matches from '../database/models/MatchesModel';
import Teams from '../database/models/TeamsModel';
import CustomError from '../utils/StatusError';

export default class MatchesService {
  constructor(private matchesModel = Matches, private teamModel = Teams) {}

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
    const matches = await this.matchesModel.findAll({
      where: { inProgress },
      include: [
        { model: Teams, as: 'teamHome', attributes: { exclude: ['id'] } },
        { model: Teams, as: 'teamAway', attributes: { exclude: ['id'] } },
      ],
    });

    return matches;
  }

  async getAllFiltedId(inProgress: boolean): Promise<IMatches[]> {
    const matches = await this.matchesModel.findAll({
      where: { inProgress },
      include: [
        { model: Teams, as: 'teamHome' },
        { model: Teams, as: 'teamAway' },
      ],
    });

    return matches;
  }

  async verifyTeams(teams: number[]): Promise<boolean> {
    const checkTeams = await Promise.all(teams.map((currTeam: number) => this
      .teamModel.findByPk(currTeam))) as ITeams[];
    return checkTeams.every((currTeam: ITeams | boolean) => currTeam);
  }

  async addMatch(matchData: IAddMatches): Promise<IAddMatches> {
    const { awayTeam, homeTeam } = matchData;

    const validateTeams = await this.verifyTeams([awayTeam, homeTeam]);

    if (!validateTeams) throw new CustomError('There is no team with such id!', 404);

    const add = await this.matchesModel.create({ ...matchData, inProgress: true });
    return add;
  }

  async finished(id: number) {
    const update = await this.matchesModel.update(
      { inProgress: false },
      { where: { id } },
    );
    return update;
  }

  async update(newMatches: IUpdateMatches, id: number) {
    const update = await this.matchesModel.update(
      { ...newMatches },
      { where: { id } },
    );
    return update;
  }
}
