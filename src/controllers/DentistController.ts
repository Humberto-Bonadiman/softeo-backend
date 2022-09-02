import { Request, Response } from 'express';
import { prismaClient } from '../database/prismaClient';

export class DentistController {
  async create(req: Request, res: Response) {
    const { email, name } = req.body;
    const createDentist = await prismaClient.dentist.create({
      data: {
        email: email,
        name: name,
      }
    });
    return res.status(200).json(createDentist);
  }
}