import { Request, Response } from 'express';
import StatusCode from '../enums/StatusCode';
import ClientService from '../services/clientService';

class ClientController {
  public async create(req: Request, res: Response) {
    try {
      const token = req.headers.authorization;
      const elementsClient = req.body;
      const clientService = new ClientService();
      const createClient = await clientService.create(elementsClient, token as string);
      return res.status(StatusCode.OK).json(createClient);
    } catch (error) {
      return res.status(StatusCode.INTERNAL_SERVER_ERROR).json(error);
    }
  }
}

export default ClientController;