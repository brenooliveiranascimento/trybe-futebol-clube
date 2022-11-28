import { Router } from 'express';

import loginValidation from '../middlewares/loginValidation';

import LoginService from '../services/LoginService';
import LoginController from '../controller/LoginController';

const router = Router();

const loginService = new LoginService();
const loginController = new LoginController(loginService);

router.post('/', loginValidation, (req, res) => loginController.login(req, res));

export default router;
