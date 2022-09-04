import { NextFunction, Request, Response } from 'express';
import Joi from 'joi';
import ErrorMessage from '../enums/ErrorMessage';

const schemeClient = Joi.object({
  name: Joi.string().required().min(7).messages({
    'string.empty': ErrorMessage.NOT_EMPTY,
    'string.required': ErrorMessage.NOT_EMPTY,
  }),
  treatment: Joi.string().required().messages({
    'string.empty': ErrorMessage.NOT_EMPTY,
    'string.required': ErrorMessage.NOT_EMPTY,
  }),
  value: Joi.number().required(),
  numberPlots: Joi.number().required(),
});

export const validateClient = async (req: Request, res: Response, next: NextFunction) => {
  const { name, treatment, value, numberPlots } = req.body;
  if (!name || !treatment || !value || !numberPlots) {
    return res.status(401).json({ message: ErrorMessage.NOT_EMPTY });
  }
  const { error } = schemeClient.validate({
    name,
    treatment,
    value,
    numberPlots
  });
  if (error) {
    return res.status(401).json({ message: error.message });
  }
  return next();
}