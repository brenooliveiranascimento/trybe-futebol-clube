import { Response, Request } from 'express';

interface ILeaderBoarder {
  allStatistic: () => any
}

export default class LeaderBoardController {
  declare _leaderBoardService: ILeaderBoarder;
  constructor(leaderBoardService: ILeaderBoarder) {
    this._leaderBoardService = leaderBoardService;
  }

  async getStatistic(req: Request, res: Response) {
    const get = await this._leaderBoardService.allStatistic();
    return res.status(200).json(get);
  }
}
