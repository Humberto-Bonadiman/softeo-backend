import * as express from 'express';
import DentistController from '../controllers/dentistController';
import validate from '../middlewares/validateDentist';

const dentistRouter = express.Router();

dentistRouter
  .post('/', validate.validadeDentist, new DentistController().create)
  .get('/', new DentistController().listAll);

export default dentistRouter;
