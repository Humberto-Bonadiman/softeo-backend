import { Prisma } from '@prisma/client';

const date = new Date();

const newClient = {
  name: 'Luiz da Silva Azevedo',
  treatment: 'Limpeza',
  date,
  value: new Prisma.Decimal(100.55),
  numberPlots: 1,
  dentistId: 'first101',
};

const createdClient = {
  id: '1641-hfe28-c2rf8-ar3819-aw244',
  name: 'Luiz da Silva Azevedo',
  treatment: 'Limpeza',
  date,
  value: new Prisma.Decimal(100.55),
  numberPlots: 1,
  dentistId: 'first101',
}

export default { newClient, createdClient };