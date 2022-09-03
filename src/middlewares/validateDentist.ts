import { PrismaClient } from '@prisma/client';
import { NextFunction, Request, Response } from 'express';
import Joi from 'joi';
import ErrorMessage from '../enums/ErrorMessage';

export const schemeLogin = Joi.object({
  email: Joi.string().email().required().messages({
    'string.empty': ErrorMessage.NOT_EMPTY,
    'string.required': ErrorMessage.NOT_EMPTY,
    'string.email': ErrorMessage.INCORRECT_LOGIN,
  }),
  name: Joi.string().required().min(8).messages({
    'string.empty': ErrorMessage.NOT_EMPTY,
    'string.required': ErrorMessage.NOT_EMPTY,
  }),
  password: Joi.string().required().min(5).messages({
    'string.empty': ErrorMessage.NOT_EMPTY,
    'string.required': ErrorMessage.NOT_EMPTY,
  }),
});

const validadeDentist = async (req: Request, res: Response, next: NextFunction) => {
  const { email, name, password } = req.body;
  if (!email || !password) {
    return res.status(401).json({ message: ErrorMessage.NOT_EMPTY });
  }
  const user = await new PrismaClient().dentist.findFirst({
    where: { email }
  });
  if (user) {
    return res.status(401).json({ message: ErrorMessage.EXISTING_EMAIL });
  }
  const { error } = schemeLogin.validate({ email, name, password });
  if (error) {
    return res.status(401).json({ message: error.message });
  }
  return next();
};

export default { validadeDentist };