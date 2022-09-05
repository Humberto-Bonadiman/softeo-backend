import { PrismaClient } from '@prisma/client';
import { verify } from 'jsonwebtoken';
import { tokenInterface } from '../interfaces/tokenInterface';
import { clientInterface } from '../interfaces/clientInterface';
import { JWT_SECRET } from '../utils/config';

class ClientService {
  public changeTime(dateTime: Date) {
    return dateTime.toLocaleString("pt-Br",{
      dateStyle: "short",
      timeStyle: "short",
      timeZone: "America/Sao_Paulo"
    });
  }

  public async create(elementsClient: clientInterface, token: string) {
    try {
      const { name, treatment, value, numberPlots } = elementsClient;
      const decoded = verify(token, JWT_SECRET as string);
      const idDentist = (decoded as tokenInterface).data.id;
      const prisma = new PrismaClient();
      const valuePlots = (parseFloat(value.toString()) / numberPlots).toFixed(2);
      const createClient = await prisma.client.create({
        data: {
          name,
          treatment,
          value,
          numberPlots,
          valuePlots,
          dentistId: idDentist,
        }
      });
      const dat = createClient.date.toLocaleString("pt-Br",{
        dateStyle: "short",
        timeStyle: "short",
        timeZone: "America/Sao_Paulo"
      });
      return {
        id: createClient.id,
        name: createClient.name,
        treatment: createClient.treatment,
        date: dat,
        value: createClient.value,
        numberPlots: createClient.numberPlots,
        valuePlots: createClient.valuePlots,
        dentistId: createClient.dentistId
      };
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
      return {
        id: findClientById.id,
        name: findClientById.name,
        treatment: findClientById.treatment,
        date: this.changeTime(findClientById.date),
        value: findClientById.value,
        numberPlots: findClientById.numberPlots,
        valuePlots: findClientById.valuePlots,
        dentistId: findClientById.dentistId
      };
    } catch (err) {
      throw Error;
    }
  }

  public async updateById(id: string, elementsClient: clientInterface) {
    try {
      const prisma = new PrismaClient();
      const { name, treatment, value, numberPlots } = elementsClient;
      await prisma.client.update({
        where: { id },
        data: { name, treatment, value, numberPlots },
      });
      const updateClientById = await prisma.client.findUniqueOrThrow({
        where: { id },
      });
      return {
        id: updateClientById.id,
        name: updateClientById.name,
        treatment: updateClientById.treatment,
        date: this.changeTime(updateClientById.date),
        value: updateClientById.value,
        numberPlots: updateClientById.numberPlots,
        valuePlots: updateClientById.valuePlots,
        dentistId: updateClientById.dentistId
      };
    } catch (err) {
      throw Error;
    }
  }

  public async deleteById(id: string) {
    try {
      const prisma = new PrismaClient();
      await prisma.client.delete({ where: { id } });
    } catch (err) {
      throw Error;
    }
  }
}

export default ClientService;