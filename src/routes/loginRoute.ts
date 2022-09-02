import * as express from 'express';
import DentistController from '../controllers/dentistController';

const loginRouter = express.Router();

loginRouter
  .post('/', new DentistController().login);

export default loginRouter;