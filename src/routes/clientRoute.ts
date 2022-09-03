import * as express from 'express';
import ClientController from '../controllers/clientController';

const clientRouter = express.Router();

clientRouter
  .post('/', new ClientController().create);

export default clientRouter;