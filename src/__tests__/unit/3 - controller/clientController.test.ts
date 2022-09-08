import * as sinon from 'sinon';
import chai from 'chai';
import chaiHttp from 'chai-http';
import StatusCode from '../../../enums/StatusCode';
import { App } from '../../../app';
import { prisma } from '../../client';
import clientMock from '../../mocks/clientMock';
import { Prisma, PrismaClient } from '@prisma/client';

chai.use(chaiHttp);
const { expect } = chai;
const { app } = new App();
let chaiHttpResponse;

describe('6 - Create a new client', () => {
  
  describe('when it is created successfully', () => {
    let createClient: sinon.SinonStub;

    before(() => {
      createClient = sinon.stub(prisma.client, 'create').resolves(clientMock.createdClient);
    });
    after( async () => {
      createClient.restore();
    });

    it('returns the correct data', async () => {
      const token = await chai
        .request(app)
        .post('/login')
        .send({
          email: 'mario_souza@email.com',
          name: 'Mario Carvalho Souza',
          password: 'minha_senha',
        });
      chaiHttpResponse = await chai
        .request(app)
        .post('/client')
        .set('authorization', token.body)
        .send({
          name: 'Luiz da Silva Azevedo',
          treatment: 'Limpeza',
          value: 100.00,
          numberPlots: 1,
        });

      const clientCreate = chaiHttpResponse.body;
      expect(chaiHttpResponse).to.have.status(StatusCode.CREATED);
      expect(clientCreate.name).to.deep.equal('Luiz da Silva Azevedo');
      expect(clientCreate.treatment).to.deep.equal('Limpeza');
      expect(clientCreate.date).to.be.an('string');
      expect(clientCreate.numberPlots).to.deep.equal(1);
      expect(clientCreate.valuePlots).to.deep.equal('100.00');
      expect(clientCreate.dentistId).to.deep.equal('first101');

      await new PrismaClient().client.delete({ where: { id: clientCreate.id }});
    });
  });
});

describe('6 - Find all clients', () => {
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

    it('returns the correct data', async () => {
      const token = await chai
        .request(app)
        .post('/login')
        .send({
          email: 'mario_souza@email.com',
          password: 'minha_senha',
        });
      chaiHttpResponse = await chai
        .request(app)
        .get('/client')
        .set('authorization', token.body);

      const listClients = chaiHttpResponse.body;
      const response = listClients
        .find((client: { id: string; }) => client.id === 'second101');
      expect(chaiHttpResponse).to.have.status(StatusCode.OK);
      expect(listClients).to.be.an('array');
      expect(response.name).to.deep.equal('Mario Souza Carvalho');
      expect(response.treatment).to.deep.equal('Limpeza');
      expect(response.date).to.be.an('string');
      expect(response.numberPlots).to.deep.equal(1);
      expect(response.valuePlots).to.deep.equal('100.00');
      expect(response.dentistId).to.deep.equal('first101');
    });
  });
});

describe('6 - Find a client by id', () => {
  describe('when show the client', () => {
    let findById: sinon.SinonStub;
    before(() => {
      findById = sinon
        .stub(prisma.client, 'findUnique')
        .resolves(clientMock.createdClient);
    });

    after(() => {
      findById.restore();
    });

    it('returns the correct data', async () => {
      const token = await chai
        .request(app)
        .post('/login')
        .send({
          email: 'mario_souza@email.com',
          password: 'minha_senha',
        });
      chaiHttpResponse = await chai
        .request(app)
        .get('/client/second101')
        .set('authorization', token.body);

      const showClient = chaiHttpResponse.body;
      expect(chaiHttpResponse).to.have.status(StatusCode.OK);
      expect(showClient).to.be.an('object');
      expect(showClient.name).to.deep.equal('Mario Souza Carvalho');
      expect(showClient.treatment).to.deep.equal('Limpeza');
      expect(showClient.date).to.be.an('string');
      expect(showClient.numberPlots).to.deep.equal(1);
      expect(showClient.valuePlots).to.deep.equal('100.00');
      expect(showClient.dentistId).to.deep.equal('first101');
    });
  });
});

describe('6 - Update a client by id', () => {
  describe('when update the client', () => {
    let updateById: sinon.SinonStub;
    before(() => {
      updateById = sinon
        .stub(prisma.client, 'update')
        .resolves(clientMock.createdClient);
    });

    after(() => {
      updateById.restore();
    });

    it('returns the expected date', async () => {
      const token = await chai
        .request(app)
        .post('/login')
        .send({
          email: 'mario_souza@email.com',
          name: 'Mario Carvalho Souza',
          password: 'minha_senha',
        });
      chaiHttpResponse = await chai
        .request(app)
        .put('/client/second101')
        .set('authorization', token.body)
        .send({
          name: 'Mario Souza Carvalho',
          treatment: 'Limpeza',
          date: '08/09/2022 14:30',
          value: new Prisma.Decimal(100.00),
          numberPlots: 1
        });

      const response = chaiHttpResponse.body;
      expect(chaiHttpResponse).to.have.status(StatusCode.OK);
      expect(response).to.be.an('object');
      expect(response.name).to.deep.equal('Mario Souza Carvalho');
      expect(response.treatment).to.deep.equal('Limpeza');
      expect(response.date).to.be.an('string');
      expect(response.numberPlots).to.deep.equal(1);
      expect(response.valuePlots).to.deep.equal('100.00');
      expect(response.dentistId).to.deep.equal('first101');
    });
  });
});

describe('6 - Delete a client by id', () => {
  describe('when delete the client', () => {
    let deleteById: sinon.SinonStub;
    before(() => {
      deleteById = sinon
        .stub(prisma.client, 'delete')
        .resolves(clientMock.createdClient);
    });

    after(() => {
      deleteById.restore();
    });

    it('does not return anything', async () => {
      const token = await chai
      .request(app)
      .post('/login')
      .send({
        email: 'mario_souza@email.com',
        name: 'Mario Carvalho Souza',
        password: 'minha_senha',
      });
    const client = await chai
      .request(app)
      .post('/client')
      .set('authorization', token.body)
      .send({
        name: 'Ricardo Da Silva Azevedo',
        treatment: 'Tratamento de canal',
        value: new Prisma.Decimal(1000.00),
        numberPlots: 4,
        valuePlots: '250.00',
        dentistId: 'first101'
      });
    chaiHttpResponse = await chai
      .request(app)
      .delete(`/client/${client.body.id}`)
      .set('authorization', token.body);

    const response = chaiHttpResponse.body;
    expect(chaiHttpResponse).to.have.status(StatusCode.OK);
    expect(chaiHttpResponse.body).to.be.an('object');
    expect(response.id).to.be.an('string');
    expect(response.name).to.be.equal('Ricardo Da Silva Azevedo');
    expect(response.treatment).to.be.equal('Tratamento de canal');
    expect(response.value).to.be.equal('1000');
    expect(response.numberPlots).to.be.equal(4);
    expect(response.valuePlots).to.be.equal('250.00');
    expect(response.dentistId).to.be.equal('first101');
    });
  });
});