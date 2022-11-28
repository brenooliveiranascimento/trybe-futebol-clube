import { Router } from 'express';
import TeamController from '../controller/TeamController';
import TeamService from '../services/TeamsService';

const teamRouter = Router();

const teamService = new TeamService();
const teamController = new TeamController(teamService);

teamRouter.use('/', (req, res) => teamController.getAll(req, res));

export default teamRouter;
