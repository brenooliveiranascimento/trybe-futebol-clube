import { Request, Response } from 'express';
import { IMatches } from '../interface/IMatches';

interface IMatchesServices {
  getAll: () => Promise<IMatches[]>;
}
export default class MatchesController {
  declare _matchesService: IMatchesServices;
  constructor(matchesServices: IMatchesServices) {
    this._matchesService = matchesServices;
  }

  async getAll(_req: Request, res: Response) {
    const matches = await this._matchesService.getAll();
    return res.status(200).json(matches);
  }
}
