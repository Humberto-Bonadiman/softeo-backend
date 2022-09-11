import { PrismaClient } from '@prisma/client';
import { NextFunction, Request, Response } from 'express';
import Joi from 'joi';
import ErrorMessage from '../enums/ErrorMessage';

const prisma = new PrismaClient();

export const schemeId = Joi.object({ id: Joi.string().required() });

const validateId = async (
  req: typeof Request,
  res: typeof Response,
  next: typeof NextFunction
) => {
  const { id } = req.params;
  const findClientById = await prisma.client.findUniqueOrThrow({
    where: { id },
  });
  if (!findClientById) {
    return res.status(401).json({ message: ErrorMessage.NO_ID });
  }
  const { error } = schemeId.validate({ id });
  if (error) {
    return res.status(400).json({ message: error.message });
  }
  return next();
};

export default validateId;