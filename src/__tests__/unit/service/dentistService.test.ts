import sinon from 'sinon';
import { expect } from 'chai';
import { prisma } from '../../client';
import DentistService from '../../../services/dentistService';
import dentistMock from '../../mocks/dentistMock';

const dentistService = new DentistService();

describe('Create a new dentist by service', () => {
  describe('when it is created successfully', () => {
    let create: sinon.SinonStub;
    before(() => {
      create = sinon
        .stub(prisma.dentist, 'create')
        .resolves(dentistMock.createdDentist);
    });

    after(() => {
      create.restore();
    });

    it('returns an object with the correct data', async () => {
      const response = await dentistService.create(dentistMock.newDentist);

      expect(response).to.be.an('object');
      expect(response).to.have.a.property('id');
      expect(response).to.have.a.property('email');
      expect(response).to.have.a.property('name');
      expect(response).to.have.a.property('password');
      expect(response.email).to.be.equal('email_for_test@email.com');
      expect(response.name).to.be.equal('Email For Test');

      await prisma.dentist.delete({ where: { email: response.email } });
    })
  });
});

describe('List all dentists by service', () => {
  describe('when list all dentists successfully', () => {
    let listAll: sinon.SinonStub;
    before(() => {
      listAll = sinon
        .stub(prisma.dentist, 'findMany')
        .resolves(dentistMock.listDentist);
    });

    after(() => {
      listAll.restore();
    });

    it('returns an array with the correct data', async () => {
      const firstDentist = await dentistService.create(dentistMock.newDentist);
      const secondDentist = await dentistService.create(dentistMock.createdSecondDentist);
      const response = await dentistService.listAll();
      const firstCreated = await prisma.dentist.findUniqueOrThrow({
        where: { id: firstDentist.id }
      });
      const secondCreate = await prisma.dentist.findUniqueOrThrow({
        where: { id: secondDentist.id }
      });

      expect(response).to.be.an('array');
      expect(firstCreated.email).to.be.equal('email_for_test@email.com');
      expect(firstCreated.name).to.be.equal('Email For Test');
      expect(firstCreated.password).to.be.equal('password_email');
      expect(secondCreate.email).to.be.equal('second_email_for_test@email.com');
      expect(secondCreate.name).to.be.equal('Second Email For Test');
      expect(secondCreate.password).to.be.equal('password_second');

      await prisma.dentist.delete({ where: { email: firstDentist.email } });
      await prisma.dentist.delete({ where: { email: secondDentist.email } });
    });
  });
});

describe('Login via the service', () => {
  describe('when login succeeds', () => {
    let login: sinon.SinonStub;
    before(() => {
      login = sinon
        .stub(prisma.dentist, 'findFirst')
        .resolves(dentistMock.createdDentist);
    });

    after(() => {
      login.restore();
    });

    it('returns a token with the correct data', async () => {
      const dentist = await dentistService.create(dentistMock.newDentist);
      const response = await dentistService.login(dentist.email, dentist.password);

      expect(response).to.be.an('string');

      await prisma.dentist.delete({ where: { email: dentist.email } });
    });
  });
})