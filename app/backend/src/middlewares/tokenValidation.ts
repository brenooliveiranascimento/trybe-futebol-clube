import { NextFunction, Request, Response } from 'express';

import jwt = require('jsonwebtoken');
import CustomError from '../utils/StatusError';

const tokenValidation = (req:Request, res: Response, next: NextFunction) => {
  const { authorization } = req.headers;

  if (!authorization) {
    throw new CustomError('Token not found', 404);
  }

  try {
    const { email } = jwt
      .verify(authorization, process.env.JWT_SECRET as string) as Record<string, string>;

    req.body = { ...req.body, email };
    return next();
  } catch (_error) {
    throw new CustomError('Token must be a valid token', 404);
  }
};

export default tokenValidation;
