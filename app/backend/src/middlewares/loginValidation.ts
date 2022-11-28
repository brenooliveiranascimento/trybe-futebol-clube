import { NextFunction, Request, Response } from 'express';

import Joi = require('joi');

const FIELD_ERROR = 'All fields must be filled';

const loginSchema = Joi.object({
  email: Joi.string().email().required().messages({
    'string.empty': FIELD_ERROR,
    'any.required': FIELD_ERROR,
  }),
  password: Joi.string().min(6).required().messages({
    'string.empty': FIELD_ERROR,
    'any.required': FIELD_ERROR,
  }),
});

const validateLogin = async (req: Request, res: Response, next: NextFunction) => {
  const { error } = loginSchema.validate(req.body);
  if (error) {
    return res.status(400).json({ message: error.message });
  }
  next();
};

export default validateLogin;
