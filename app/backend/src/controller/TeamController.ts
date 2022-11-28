import { Request, Response } from 'express';
import { ITeams } from '../interface/ITeams';

interface ITeamService {
  getAll: () => Promise<ITeams[]>
}

export default class TeamController {
  declare _teamService: ITeamService;
  constructor(teamService: ITeamService) {
    this._teamService = teamService;
  }

  async getAll(req: Request, res: Response) {
    const getAll = await this._teamService.getAll();
    return res.status(200).json(getAll);
  }
}
