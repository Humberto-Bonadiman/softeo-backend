import * as express from 'express';
import ClientController from '../controllers/clientController';

const clientRouter = express.Router();

clientRouter
  .post('/', new ClientController().create)
  .get('/', new ClientController().findAll);

export default clientRouter;