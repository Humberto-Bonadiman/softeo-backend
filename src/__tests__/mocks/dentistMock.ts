import { dentistInterface } from "../../interfaces/dentistInterface";

const newDentist: dentistInterface = {
  email: 'joao_ricardo@email.com',
  name: 'João Ricardo',
  password: 'password_dentist'
};

const createdDentist = {
  id: '1641-hfe28-c2rf8-ar3819',
  email: 'joao_ricardo@email.com',
  name: 'João Ricardo',
  password: 'password_dentist'
};

const withoutEmail = {
  name: 'João Ricardo',
  password: 'password_dentist'
};

const withoutPassword = {
  email: 'joao_ricardo@email.com',
  name: 'João Ricardo'
}

export default { newDentist, createdDentist, withoutEmail, withoutPassword };