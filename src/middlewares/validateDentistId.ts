import { createRequire } from "module";
const require = createRequire(import.meta.url);
import { PrismaClient } from '@prisma/client';
import Joi from 'joi';
import ErrorMessage from '../enums/ErrorMessage';


const { Request, Response, NextFunction } = require('express');

const prisma = new PrismaClient();

export const schemeId = Joi.object({ dentistId: Joi.string().required() });

const validateDentistId = async (
  req: typeof Request,
  res: typeof Response,
  next: typeof NextFunction
) => {
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