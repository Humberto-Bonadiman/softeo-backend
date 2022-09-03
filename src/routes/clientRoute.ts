import * as express from 'express';
import ClientController from '../controllers/clientController';
import validate from '../middlewares/validateToken';

const clientRouter = express.Router();

clientRouter
  .post('/', validate.validadeToken, new ClientController().create)
  .get('/', validate.validadeToken, new ClientController().findAll)
  .get('/:id', validate.validadeToken, new ClientController().findById)
  .put('/:id', validate.validadeToken, new ClientController().updateById)
  .delete('/:id', validate.validadeToken, new ClientController().deleteById);

export default clientRouter;