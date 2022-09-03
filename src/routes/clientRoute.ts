import * as express from 'express';
import ClientController from '../controllers/clientController';

const clientRouter = express.Router();

clientRouter
  .post('/', new ClientController().create)
  .get('/', new ClientController().findAll)
  .get('/:id', new ClientController().findById);

export default clientRouter;