import { compare } from 'bcryptjs';
import generateToken from '../utils/generateJwt';
import IUserCreadentials from '../interface/IUserCredentials';
import Users from '../database/models/UsersModel';
import StatusError from '../utils/StatusError';

export default class LoginService {
  constructor(private model = Users) {}
  async findUserByEmail(email: string) {
    const user = await this.model.findOne({ where: { email } });
    return user;
  }

  async login(userCredentials: IUserCreadentials): Promise<string | Error> {
    const { email, password } = userCredentials;

    const checkUserExist = await this.findUserByEmail(email);
    if (!checkUserExist) return new StatusError('User dont exist', 401);

    const verifyPassword = compare(password, checkUserExist.password);
    if (!verifyPassword) throw new StatusError('Invalid passord', 401);

    const token = generateToken(checkUserExist.id, checkUserExist.email);
    return token;
  }
}
