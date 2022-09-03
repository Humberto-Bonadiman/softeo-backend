import { PrismaClient } from '@prisma/client';
import { verify } from 'jsonwebtoken';
import { tokenInterface } from '../interfaces/tokenInterface';
import { clientInterface } from '../interfaces/clientInterface';
import { JWT_SECRET } from '../utils/config';

class ClientService {
  public async create(elementsClient: clientInterface, token: string) {
    try {
      const { name, treatment, value, numberPlots } = elementsClient;
      const decoded = verify(token, JWT_SECRET as string);
      const idDentist = (decoded as tokenInterface).data.id;
      const prisma = new PrismaClient();
      const createClient = await prisma.client.create({
        data: {
          name,
          treatment,
          value,
          numberPlots,
          dentistId: idDentist,
        }
      });
      return createClient;
    } catch (err) {
      throw Error;
    }
  }

  public async findAll() {
    try {
      const prisma = new PrismaClient();
      const findAllClients = await prisma.client.findMany();
      return findAllClients;
    } catch (err) {
      throw Error;
    }
  }

  public async findById(id: string) {
    try {
      const prisma = new PrismaClient();
      const findClientById = await prisma.client.findUniqueOrThrow({
        where: { id },
      });
      return findClientById;
    } catch (err) {
      throw Error;
    }
  }
}

export default ClientService;