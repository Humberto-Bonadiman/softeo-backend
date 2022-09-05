import sinon from 'sinon';
import { expect } from 'chai';
import { Prisma } from '@prisma/client';
import { prisma } from '../../client';
import ClientService from '../../../services/clientService';
import DentistService from '../../../services/dentistService';
import clientMock from '../../mocks/clientMock';
import dentistMock from '../../mocks/dentistMock';

const clientService = new ClientService();
const dentistService = new DentistService();

describe('Create a new client by service', () => {
  describe('when it is created successfully', () => {
    let createClient: sinon.SinonStub;
    let createDentist: sinon.SinonStub;
    before(() => {
      createClient = sinon
        .stub(prisma.client, 'create')
        .resolves(clientMock.createdClient);
      createDentist = sinon
        .stub(prisma.dentist, 'create')
        .resolves(dentistMock.dentistClient);
    });

    after(() => {
      createClient.restore();
      createDentist.restore();
    });

    it('returns an object with the correct data', async () => {
      const dentist = await dentistService.create(dentistMock.newDentistClient);
      const token = await dentistService.login(dentist.email, dentist.password);

      const response = await clientService.create(clientMock.newClient, token);

      expect(response).to.be.an('object');
      expect(response.id).to.be.an('string');
      expect(response.name).to.be.equal('Luiz da Silva Azevedo');
      expect(response.treatment).to.be.equal('Limpeza');
      expect(typeof response.value).to.be.equal(typeof new Prisma.Decimal(100.55));
      expect(response.numberPlots).to.be.equal(1);
      expect(response.valuePlots).to.be.equal('100.55');
      expect(response.dentistId).to.be.equal(dentist.id);

      await prisma.client.delete({ where: {
        id: response.id
      }});
      await prisma.dentist.delete({ where: { email: dentist.email } });
    });
  })
});

describe('Find all clients by service', () => {
  describe('when list all clients', () => {
    let findAll: sinon.SinonStub;
    before(() => {
      findAll = sinon
        .stub(prisma.client, 'findMany')
        .resolves(clientMock.listClients);
    });

    after(() => {
      findAll.restore();
    });

    it('return the expected data', async () => {
      const dentist = await dentistService.create(dentistMock.newDentistClient);
      const token = await dentistService.login(dentist.email, dentist.password);

      const firstClient = await clientService.create(clientMock.newClient, token);
      const secondClient = await clientService.create(clientMock.newSecondClient, token);
      const response = await clientService.findAll();
      const responseFirst = response.find(object => object.id == firstClient.id);
      const responseSecond = response.find(object => object.id == secondClient.id);

      expect(response).to.be.an('array');
      expect(responseFirst?.name).to.be.equal('Luiz da Silva Azevedo');
      expect(responseSecond?.name).to.be.equal('Ricardo Da Silva Azevedo');
      expect(responseFirst?.treatment).to.be.equal('Limpeza');
      expect(responseSecond?.treatment).to.be.equal('Tratamento de canal');
      expect(responseFirst?.date).to.be.equal(firstClient.date);
      expect(responseSecond?.date).to.be.equal(secondClient.date);
      expect(typeof responseFirst?.value).to.be.equal(typeof new Prisma.Decimal(100.55));
      expect(typeof responseSecond?.value).to.be.equal(typeof new Prisma.Decimal(1000.00));
      expect(responseFirst?.numberPlots).to.be.equal(1);
      expect(responseSecond?.numberPlots).to.be.equal(4);
      expect(responseFirst?.valuePlots).to.be.equal('100.55');
      expect(responseSecond?.valuePlots).to.be.equal('250.00');
      expect(responseFirst?.dentistId).to.be.equal(firstClient.dentistId);
      expect(responseSecond?.dentistId).to.be.equal(secondClient.dentistId);
    });
  });
});
