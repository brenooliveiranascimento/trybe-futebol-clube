import Teams from '../database/models/TeamsModel';
import { ITeams } from '../interface/ITeams';

export default class TeamService {
  constructor(private teamModel = Teams) {}

  async getAll(): Promise<ITeams[]> {
    const allTeams: ITeams[] = await this.teamModel.findAll();
    return allTeams;
  }
}
