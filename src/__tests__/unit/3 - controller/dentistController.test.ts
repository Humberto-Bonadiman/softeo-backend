import * as sinon from 'sinon';
import chai from 'chai';
import chaiHttp from 'chai-http';
import StatusCode from '../../../enums/StatusCode';
import { App } from '../../../app';
import { prisma } from '../../client';
import dentistMock from '../../mocks/dentistMock';

chai.use(chaiHttp);
const { expect } = chai;
const { app } = new App();

describe('5 - Create a new dentist', () => {
  let chaiHttpResponse;
  describe('when it is created successfully', () => {
    let createDentist: sinon.SinonStub;

    before(() => {
      createDentist = sinon.stub(prisma.dentist, 'create').resolves(dentistMock.createdDentist);
    });
    after( async () => {
      createDentist.restore();
    });

    it('returns the correct data', async () => {
      chaiHttpResponse = await chai
        .request(app)
        .post('/dentist')
        .set('X-API-Key', 'foobar')
        .send({
          email: 'email_for_test@email.com',
          name: 'Email For Test',
          password: 'password_email'
        });

      const dentistCreate = chaiHttpResponse.body;
      expect(chaiHttpResponse).to.have.status(StatusCode.OK);
      expect(dentistCreate.name).to.deep.equal(dentistMock.createdDentist.name);
      expect(dentistCreate.email).to.deep.equal(dentistMock.createdDentist.email);
      expect(dentistCreate.password).to.deep.equal(dentistMock.createdDentist.password);

      await prisma.dentist.delete({ where: { email: dentistCreate.email } });
    });
  });
});

describe('5 - Login with a dentist', () => {
  let chaiHttpResponse;
  describe('when login is successful', () => {
    let loginDentist: sinon.SinonStub;

    before(() => {
      loginDentist = sinon
        .stub(prisma.dentist, 'findFirst')
        .resolves(dentistMock.createdDentist);
    });
    after( async () => {
      loginDentist.restore();
    });

    it('returns the correct data', async () => {
      chaiHttpResponse = await chai
        .request(app)
        .post('/login')
        .set('X-API-Key', 'foobar')
        .send({
          email: "mario_souza@email.com",
          password: "minha_senha"
        });

      const dentistCreate = chaiHttpResponse.body;
      expect(chaiHttpResponse).to.have.status(StatusCode.OK);
      expect(dentistCreate).to.be.an('string');
    });
  });
});

describe('5 - List all dentists', () => {
  let chaiHttpResponse;
  describe('when list all successfully', () => {
    let findDentists: sinon.SinonStub;

    before(() => {
      findDentists = sinon
        .stub(prisma.dentist, 'findMany')
        .resolves(dentistMock.listDentist);
    });
    after( async () => {
      findDentists.restore();
    });
    it('returns the correct data', async () => {
      chaiHttpResponse = await chai
        .request(app)
        .get('/dentist')
        .set('X-API-Key', 'foobar');

      const dentistCreate = chaiHttpResponse.body;

      const response = dentistCreate
        .find((dentist: { id: string; }) => dentist.id === 'first101');

      expect(chaiHttpResponse).to.have.status(StatusCode.OK);
      expect(dentistCreate).to.be.an('array');
      expect(dentistCreate[0]).to.be.an('object');
      expect(response.email).be.be.equal('mario_souza@email.com');
      expect(response.name).to.be.equal('Mario Carvalho Souza');
      expect(response.password).to.be.equal('minha_senha');
    });
  });
});