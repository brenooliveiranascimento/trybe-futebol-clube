import { Response, Request } from 'express';
import LoginService from '../services/LoginService';

export default class LoginController {
  constructor(private loginService: LoginService) {
    this.loginService = loginService;
  }

  async login(req: Request, res: Response) {
    const { email, password } = req.body;
    const token = await this.loginService.login({ email, password });
    res.status(200).json({ token });
  }

  async validate(req: Request, res: Response) {
    const { email } = req.body;
    const role = await this.loginService.validate(email);
    return res.status(200).json(role);
  }
}
