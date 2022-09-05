import { dentistInterface } from "../../interfaces/dentistInterface";

const newDentist: dentistInterface = {
  email: 'email_for_test@email.com',
  name: 'Email For Test',
  password: 'password_email'
};

const createdDentist = {
  id: '1641-hfe28-c2rf8-ar3819',
  email: 'email_for_test@email.com',
  name: 'Email For Test',
  password: 'password_email'
};

const createdSecondDentist = {
  id: '1641-hfe28-c2rf8-tu325',
  email: 'second_email_for_test@email.com',
  name: 'Second Email For Test',
  password: 'password_second'
};

const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJkYXRhIjp7ImlkIjoiMTYyZTc0MzctYjJiZC00ODhjLWJhZTAtNzU1MWI1ZmU3MzgwIiwiZW1haWwiOiJlbWFpbF9mb3JfdGVzdEBlbWFpbC5jb20ifSwiaWF0IjoxNjYyMzQ5OTQzLCJleHAiOjE2NjI5NTQ3NDN9.hzrzGnuPDyZiUNxkSmVKOkz4Rsc_BtZkiTsXnHBmBrA";

const withoutEmail = {
  name: 'Email For Test',
  password: 'password_email'
};

const withoutPassword = {
  email: 'email_for_test@email.com',
  name: 'Email For Test'
}

const listDentist = [
  {
    id: '1641-hfe28-c2rf8-ar3819',
    email: 'email_for_test@email.com',
    name: 'Email For Test',
    password: 'password_email'
  },
  {
    id: '1641-hfe28-c2rf8-tu325',
    email: 'second_email_for_test@email.com',
    name: 'Second Email For Test',
    password: 'password_second'
  }
];

export default {
  newDentist,
  createdDentist,
  token,
  withoutEmail,
  withoutPassword,
  createdSecondDentist,
  listDentist,
};