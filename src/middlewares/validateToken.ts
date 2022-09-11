import { NextFunction, Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';
import { verify } from 'jsonwebtoken';
import ErrorMessage from '../enums/ErrorMessage';
import { tokenInterface } from '../interfaces/tokenInterface';
import { JWT_SECRET } from '../utils/config';

const prisma = new PrismaClient();

export const validateToken = async (
  req: typeof Request,
  res: typeof Response,
  next: typeof NextFunction
) => {
  const { authorization } = req.headers;
  if (!authorization) {
    return res.status(401).json({ message: ErrorMessage.TOKEN_NOT_FOUND });
  }
  const decoded = verify(authorization, JWT_SECRET as string);
  const findDentistById = await prisma.dentist.findUniqueOrThrow({
    where: { id: (decoded as tokenInterface).data.id },
  });
  if (!findDentistById) {
    return res.status(401).json({ message: ErrorMessage.INVALID_TOKEN });
  }

  return next();
};