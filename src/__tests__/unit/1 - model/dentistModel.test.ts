import sinon from 'sinon';
import { expect } from 'chai';
import { prisma } from '../../client';
import dentistMock from '../../mocks/dentistMock';

describe('1 - Create a new dentist by model', () => {
  describe('when it is created successfully', () => {
    let create: sinon.SinonStub;
    before(() => {
      create = sinon
        .stub(prisma.dentist, 'create')
        .resolves(dentistMock.createdDentist);
    });

    after(()=>{
      create.restore();
    });

    describe('when it is successfully entered', () => {
      it('returns an object with the correct data', async () => {
        /* const response = await prisma.dentist.create({ data: dentistMock.newDentist}); */
        const response = await prisma.dentist.create({
          data: dentistMock.newDentist
        });
  
        expect(response).to.be.an('object');
        expect(response).to.have.a.property('id');
        expect(response).to.have.a.property('email');
        expect(response).to.have.a.property('name');
        expect(response).to.have.a.property('password');
        expect(response.email).to.be.equal('email_for_test@email.com');
        expect(response.name).to.be.equal('Email For Test');

        await prisma.dentist.delete({ where: { email: response.email }});
      });
    });
  });
});
