import { Router } from 'express';

import LeaderBoardService from '../services/LeaderBoardService';
import LeaderBoardController from '../controller/LeaderBoardController';

const leaderBoerderService = new LeaderBoardService();
const leaderBoardController = new LeaderBoardController(leaderBoerderService);

const router = Router();

router.get('/home', (req, res) => leaderBoardController.getStatistic(req, res));

export default router;
