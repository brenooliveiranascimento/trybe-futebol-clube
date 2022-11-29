import { Router } from 'express';

import MatchesController from '../controller/MatchesController';
import MatchesService from '../services/MatchesServices';

const matchesService = new MatchesService();
const matcherController = new MatchesController(matchesService);

const matchesRouter = Router();

matchesRouter.get('/', (req, res) => matcherController.getAll(req, res));
matchesRouter.post('/', (req, res) => matcherController.addMatch(req, res));

export default matchesRouter;
