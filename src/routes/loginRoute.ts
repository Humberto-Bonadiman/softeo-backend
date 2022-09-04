import * as express from 'express';
import DentistController from '../controllers/dentistController';
import { validateLogin } from '../middlewares/validateLogin';

const loginRouter = express.Router();

loginRouter
  .post('/', validateLogin, new DentistController().login);

export default loginRouter;