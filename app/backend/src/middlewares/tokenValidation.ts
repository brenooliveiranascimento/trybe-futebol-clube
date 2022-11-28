import { NextFunction, Request, Response } from 'express';

import jwt = require('jsonwebtoken');
import CustomError from '../utils/StatusError';

const { JWT_SECRET = 'jwt_secret' } = process.env;

const tokenValidation = (req:Request, res: Response, next: NextFunction) => {
  const { authorization } = req.headers;

  if (!authorization) {
    throw new CustomError('Token not found', 404);
  }

  try {
    const payload = jwt.verify(authorization, JWT_SECRET);
    req.body = { ...req.body, user: payload };
    return next();
  } catch (_error) {
    throw new CustomError('Token must be a valid token', 404);
  }
};

export default tokenValidation;
