import { Request, Response } from 'express';
import { IMatches } from '../interface/IMatches';

interface IMatchesServices {
  getAll: () => Promise<IMatches[]>;
  getAllFilted: (inProgress: boolean) => Promise<IMatches[]>;
}
export default class MatchesController {
  declare _matchesService: IMatchesServices;
  constructor(matchesServices: IMatchesServices) {
    this._matchesService = matchesServices;
  }

  async getAll(req: Request, res: Response) {
    const { inProgress } = req.query;
    if (inProgress) {
      const matches = await this._matchesService.getAllFilted(!!inProgress);
      return res.status(200).json(matches);
    }
    const matches = await this._matchesService.getAll();
    return res.status(200).json(matches);
  }
}
