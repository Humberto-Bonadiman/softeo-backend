import sinon from 'sinon';
import { expect } from 'chai';
import { prisma } from '../client';
import clientMock from '../mocks/clientMock';
import { Prisma } from '@prisma/client';

describe('Create a new client', () => {
  describe('when it is created successfully', () => {
    let create: sinon.SinonStub;
    before(() => {
      create = sinon
        .stub(prisma.client, 'create')
        .resolves(clientMock.createdClient);
    });

    after(()=>{
      create.restore();
    });
  });

  describe('when it is successfully entered', () => {
    it('returns an object with the correct data', async () => {
      const response = await prisma.client.create({
        data: clientMock.newClient
      });

      expect(response).to.be.an('object');
      expect(response).to.have.a.property('id');
      expect(response).to.have.a.property('name');
      expect(response).to.have.a.property('treatment');
      expect(response).to.have.a.property('date');
      expect(response).to.have.a.property('value');
      expect(response).to.have.a.property('numberPlots');
      expect(response).to.have.a.property('dentistId');
      expect(response.name).to.be.equal('Luiz da Silva Azevedo');
      expect(response.treatment).to.be.equal('Limpeza');
      expect(typeof response.value).to.be.equal(typeof new Prisma.Decimal(100.55));
      expect(response.numberPlots).to.be.equal(1);
      expect(response.dentistId).to.be.equal('first101');

      await prisma.client.delete({ where: { id: response.id }});
    })
  })
});