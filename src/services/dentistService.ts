import { PrismaClient } from '@prisma/client';
import { sign } from 'jsonwebtoken';
import { dentistInterface } from '../interfaces/dentistInterface';
import { JWT_SECRET } from '../utils/config';

class DentistService {
  create(elements: dentistInterface) {
    try {
      const { email, name, password } = elements;
      const prisma = new PrismaClient();
      const createDentist = prisma.dentist.create({
        data: {
          email,
          name,
          password,
        }
      });
      return createDentist;
    } catch (err) {
      console.log(err);
      throw Error;
    }
  }

  async listAll() {
    try {
      const prisma = new PrismaClient();
      const listAllDentists = await prisma.dentist.findMany();
      return listAllDentists;
    } catch (err) {
      throw Error;
    }
  }

  async login(email: string, password: string) {
    try {
      const user = await new PrismaClient().dentist.findFirst({ where: { email, password }});
      const jwtConfig = {
        expiresIn: '7d',
        algorithm: "HS256"
      };
      const token = sign({
        data: { id: user?.id ,email: user?.email,  }, 
      }, JWT_SECRET as string, jwtConfig as object);
      return token;
    } catch (err) {
      throw Error;
    }
  }
}

export default DentistService;