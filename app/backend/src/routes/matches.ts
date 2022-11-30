import { Router } from 'express';

import MatchesController from '../controller/MatchesController';
import MatchesService from '../services/MatchesServices';

import tokenValidation from '../middlewares/tokenValidation';

const matchesService = new MatchesService();
const matcherController = new MatchesController(matchesService);

const router = Router();

router.get('/', (req, res) => matcherController.getAll(req, res));
router.patch(
  '/:id/finish',
  tokenValidation,
  (req, res) => matcherController.finished(req, res),
);
router.post('/', tokenValidation, (req, res) => matcherController.addMatch(req, res));

export default router;
