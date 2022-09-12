import * as express from 'express';
import ClientController from '../controllers/clientController';
import { validateClient } from '../middlewares/validateClient';
// import validateDentistId from '../middlewares/validateDentistId';
import validateId from '../middlewares/validateId';
import { validateToken } from '../middlewares/validateToken';

const clientRouter = express.Router();

clientRouter
  .post('/', validateToken, validateClient, new ClientController().create)
  .get('/', validateToken, new ClientController().findAll)
  .get(
    '/dentist',
    validateToken,
    new ClientController().findByDentistId
  )
  .get('/:id', validateToken, validateId, new ClientController().findById)
  .put(
    '/:id',
    validateToken,
    validateId,
    validateClient,
    new ClientController().updateById
  )
  .delete('/:id', validateToken, validateId, new ClientController().deleteById);

export default clientRouter;