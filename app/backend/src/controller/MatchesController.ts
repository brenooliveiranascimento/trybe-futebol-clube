import { Request, Response } from 'express';
import { IAddMatches, IMatches } from '../interface/IMatches';

interface IMatchesServices {
  getAll: () => Promise<IMatches[]>;
  getAllFilted: (inProgress: boolean) => Promise<IMatches[]>;
  addMatch: (matchData: IAddMatches) => Promise<IAddMatches>;
}
export default class MatchesController {
  declare _matchesService: IMatchesServices;
  constructor(matchesServices: IMatchesServices) {
    this._matchesService = matchesServices;
  }

  async getAll(req: Request, res: Response) {
    const { inProgress } = req.query;
    if (inProgress) {
      // const filtedMatches = matches.filter((matche: IMatches) => matche
      //   .inProgress === JSON.parse(inProgress as string));
      const filtedMatches = await this._matchesService
        .getAllFilted(JSON.parse(inProgress as string));
      return res.status(200).json(filtedMatches);
    }
    const matches = await this._matchesService.getAll();
    return res.status(200).json(matches);
  }

  async addMatch(req: Request, res: Response) {
    const matchData = req.body as IAddMatches;
    const add = await this._matchesService.addMatch(matchData);
    return res.status(201).json(add);
  }
}
