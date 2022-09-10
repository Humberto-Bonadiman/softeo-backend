import { PrismaClient } from '@prisma/client';
import { verify } from 'jsonwebtoken';
import { tokenInterface } from '../interfaces/tokenInterface';
import { clientInterface, clientWithDateInterface } from '../interfaces/clientInterface';
import { JWT_SECRET } from '../utils/config';

class ClientService {
  public async create(elementsClient: clientInterface, token: string) {
    try {
      const { name, treatment, value, numberPlots } = elementsClient;
      const decoded = verify(token, JWT_SECRET as string);
      const idDentist = (decoded as tokenInterface).data.id;
      const prisma = new PrismaClient();
      const date = new Date().toLocaleString("pt-Br",{
        dateStyle: "short",
        timeStyle: "short",
        timeZone: "America/Sao_Paulo"
      });
      const valuePlots = (parseFloat(value.toString()) / numberPlots).toFixed(2);
      const createClient = await prisma.client.create({
        data: {
          name,
          treatment,
          value,
          date,
          numberPlots,
          valuePlots,
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

  public async findByDentistId(dentistId: string) {
    try {
      const prisma = new PrismaClient();
      const findClientByDentistId = await prisma.client.findMany({
        where: { dentistId },
      });
      return findClientByDentistId;
    } catch (err) {
      throw Error;
    }
  }

  public async updateById(id: string, elementsClient: clientWithDateInterface) {
    try {
      const prisma = new PrismaClient();
      const { name, treatment, value, date, numberPlots } = elementsClient;
      const valuePlots = (parseFloat(value.toString()) / numberPlots).toFixed(2);
      await prisma.client.update({
        where: { id },
        data: { name, treatment, value, date, numberPlots, valuePlots },
      });
      const updateClientById = await prisma.client.findUniqueOrThrow({
        where: { id },
      });
      return updateClientById;
    } catch (err) {
      throw Error;
    }
  }

  public async deleteById(id: string) {
    try {
      const prisma = new PrismaClient();
      const deleteClient = await prisma.client.delete({ where: { id } });
      return deleteClient;
    } catch (err) {
      throw Error;
    }
  }
}

export default ClientService;