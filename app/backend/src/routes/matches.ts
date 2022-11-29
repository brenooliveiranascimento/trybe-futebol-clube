import { Router } from 'express';

import MatchesController from '../controller/MatchesController';
import MatchesService from '../services/MatchesServices';
import tokenValidation from '../middlewares/tokenValidation';

const matchesService = new MatchesService();
const matcherController = new MatchesController(matchesService);

const matchesRouter = Router();

matchesRouter.get('/', (req, res) => matcherController.getAll(req, res));
matchesRouter.patch('/:id', (req, res) => matcherController.finished(req, res));
matchesRouter.post('/', tokenValidation, (req, res) => matcherController.addMatch(req, res));

export default matchesRouter;
