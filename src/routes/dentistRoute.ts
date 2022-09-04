import * as express from 'express';
import DentistController from '../controllers/dentistController';
import { validateDentist } from '../middlewares/validateDentist';

const dentistRouter = express.Router();

dentistRouter
  .post('/', validateDentist, new DentistController().create)
  .get('/', new DentistController().listAll);

export default dentistRouter;
