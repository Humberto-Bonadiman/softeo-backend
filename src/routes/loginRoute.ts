import * as express from 'express';
import DentistController from '../controllers/dentistController';
import validate from '../middlewares/validateLogin';

const loginRouter = express.Router();

loginRouter
  .post('/', validate.validateLogin, new DentistController().login);

export default loginRouter;