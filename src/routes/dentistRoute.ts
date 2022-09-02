import * as express from 'express';
import DentistController from '../controllers/dentistController';

const dentistRouter = express.Router();

dentistRouter
  .post('/', new DentistController().create)
  .get('/', new DentistController().listAll);

export default dentistRouter;
