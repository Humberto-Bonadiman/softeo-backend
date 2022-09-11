import { PrismaClient } from '@prisma/client';
import { NextFunction, Request, Response } from 'express';
import Joi from 'joi';
import ErrorMessage from '../enums/ErrorMessage';

export const schemeLogin = Joi.object({
  email: Joi.string().email().required().messages({
    'string.required': ErrorMessage.NOT_EMPTY,
    'string.email': ErrorMessage.INCORRECT_LOGIN,
    'string.empty': ErrorMessage.NOT_EMPTY,
  }),
  password: Joi.string().required().min(5).messages({
    'string.required': ErrorMessage.NOT_EMPTY,
    'string.empty': ErrorMessage.NOT_EMPTY,
  }),
});

export const validateLogin = async (
  req: typeof Request,
  res: typeof Response,
  next: typeof NextFunction
) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(401).json({ message: ErrorMessage.NOT_EMPTY });
  }
  const user = await new PrismaClient().dentist.findFirst({
    where: { email, password }
  });
  if (!user) {
    return res.status(401).json({ message: ErrorMessage.INCORRECT_LOGIN });
  }
  const { error } = schemeLogin.validate({ email, password });
  if (error) {
    return res.status(401).json({ message: error.message });
  }
  return next();
};