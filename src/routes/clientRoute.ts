import * as express from 'express';
import ClientController from '../controllers/clientController';

const clientRouter = express.Router();

clientRouter
  .post('/', new ClientController().create)
  .get('/', new ClientController().findAll)
  .get('/:id', new ClientController().findById)
  .put('/:id', new ClientController().updateById);

export default clientRouter;