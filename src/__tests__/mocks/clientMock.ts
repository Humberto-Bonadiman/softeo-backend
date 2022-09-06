import { Prisma } from '@prisma/client';

const date = new Date().toLocaleString("pt-Br",{
  dateStyle: "short",
  timeStyle: "short",
  timeZone: "America/Sao_Paulo"
});

const newClient = {
  name: 'Luiz da Silva Azevedo',
  treatment: 'Limpeza',
  date,
  value: new Prisma.Decimal(100.55),
  numberPlots: 1,
};

const newSecondClient = {
  name: 'Ricardo Da Silva Azevedo',
  treatment: 'Tratamento de canal',
  date,
  value: new Prisma.Decimal(1000.00),
  numberPlots: 4,
};

const updateClient = {
  name: 'Luiz Silveira Azevedo',
  treatment: 'Limpeza',
  date,
  value: new Prisma.Decimal(120.00),
  numberPlots: 1,
};

const newClientMock = {
  name: 'Luiz da Silva Azevedo',
  treatment: 'Limpeza',
  date,
  value: new Prisma.Decimal(100.55),
  numberPlots: 1,
  valuePlots: '100.55',
  dentistId: 'first101',
};

const createdClient = {
  id: '1641-hfe28-c2rf8-ar3819-aw244',
  name: 'Luiz da Silva Azevedo',
  treatment: 'Limpeza',
  date,
  value: new Prisma.Decimal(100.55),
  numberPlots: 1,
  valuePlots: '100.55',
  dentistId: 'first101',
};

const secondClient = {
  id: '1641-hfe29-c3rf8-ar3819-aw245',
  name: 'Ricardo Da Silva Azevedo',
  treatment: 'Tratamento de canal',
  date,
  value: new Prisma.Decimal(1000.00),
  numberPlots: 4,
  valuePlots: '250.00',
  dentistId: 'first101'
};

const listClients = [createdClient, secondClient];

export default {
  newClient,
  newSecondClient,
  updateClient,
  createdClient,
  newClientMock,
  secondClient,
  listClients,
};