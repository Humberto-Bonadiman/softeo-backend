import { PrismaClient } from '@prisma/client';
import { NextFunction, Request, Response } from 'express';
import Joi from 'joi';
import ErrorMessage from '../enums/ErrorMessage';

const prisma = new PrismaClient();

export const schemeId = Joi.object({ dentistId: Joi.string().required() });

const validateDentistId = async (req: Request, res: Response, next: NextFunction) => {
  const { dentistId } = req.params;
  const findClientByDentistId = await prisma.client.findFirstOrThrow({
    where: { dentistId },
  });
  if (!findClientByDentistId) {
    return res.status(401).json({ message: ErrorMessage.NO_ID });
  }
  const { error } = schemeId.validate({ dentistId });
  if (error) {
    return res.status(400).json({ message: error.message });
  }
  return next();
};

export default validateDentistId;