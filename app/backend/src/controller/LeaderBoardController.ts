import { Response, Request } from 'express';
import { ITeamsStatistics } from '../interface/ILeaderBoarder';
import { IMatchesKeys } from '../interface/IMatches';

interface ILeaderBoarder {
  allStatistic: (type: IMatchesKeys) => Promise<ITeamsStatistics[]>
}

export default class LeaderBoardController {
  declare _leaderBoardService: ILeaderBoarder;
  constructor(leaderBoardService: ILeaderBoarder) {
    this._leaderBoardService = leaderBoardService;
  }

  async getHomeStatistic(req: Request, res: Response) {
    const get = await this._leaderBoardService.allStatistic('homeTeam');
    return res.status(200).json(get);
  }

  async getAwayStatistic(req: Request, res: Response) {
    const get = await this._leaderBoardService.allStatistic('awayTeam');
    return res.status(200).json(get);
  }
}
