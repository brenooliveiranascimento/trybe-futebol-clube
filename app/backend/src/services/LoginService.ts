import { compare } from 'bcryptjs';
import IUser from '../interface/IUser';
import generateToken from '../utils/generateJwt';
import IUserCreadentials from '../interface/IUserCredentials';
import Users from '../database/models/UsersModel';
import CustomError from '../utils/StatusError';

export default class LoginService {
  constructor(private model = Users) {}
  async findUserByEmail(email: string): Promise<IUser> {
    const user = await this.model.findOne({ where: { email } });
    return user as IUser;
  }

  async login(userCredentials: IUserCreadentials): Promise<string> {
    const { email, password } = userCredentials;

    const checkUserExist = await this.findUserByEmail(email);
    if (!checkUserExist) {
      throw new CustomError('Incorrect email or password', 401);
    }

    const verifyPassword = await compare(password, checkUserExist.password);
    if (!verifyPassword) {
      throw new CustomError('Incorrect email or password', 401);
    }

    const token = generateToken(checkUserExist.id, checkUserExist.role);
    return token;
  }

  async validate(id: number): Promise<string> {
    const { role } = await this.model.findByPk(id) as IUser;
    return role;
  }
}
