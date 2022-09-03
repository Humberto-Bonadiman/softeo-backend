import { Request, Response } from 'express';
import StatusCode from '../enums/StatusCode';
import { clientInterface } from '../interfaces/clientInterface';
import ClientService from '../services/clientService';

class ClientController {
  public async create(req: Request, res: Response) {
    try {
      const token = req.headers.authorization;
      const elementsClient = req.body;
      const clientService = new ClientService();
      const createClient = await clientService.create(elementsClient, token as string);
      return res.status(StatusCode.CREATED).json(createClient);
    } catch (error) {
      return res.status(StatusCode.INTERNAL_SERVER_ERROR).json(error);
    }
  }

  public async findAll(_req: Request, res: Response) {
    try {
      const clientService = new ClientService();
      const findAllClients = await clientService.findAll();
      return res.status(StatusCode.OK).json(findAllClients);
    } catch (error) {
      return res.status(StatusCode.INTERNAL_SERVER_ERROR).json(error);
    }
  }

  public async findById(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const clientService = new ClientService();
      const findClientById = await clientService.findById(id);
      return res.status(StatusCode.OK).json(findClientById);
    } catch (error) {
      return res.status(StatusCode.INTERNAL_SERVER_ERROR).json(error);
    }
  }

  public async updateById(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const elementsBody: clientInterface = req.body;
      const clientService = new ClientService();
      const updateClientById = await clientService.updateById(id, elementsBody);
      return res.status(StatusCode.OK).json(updateClientById);
    } catch (error) {
      return res.status(StatusCode.INTERNAL_SERVER_ERROR).json(error);
    }
  }

  public async deleteById(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const clientService = new ClientService();
      await clientService.deleteById(id);
      return res.status(StatusCode.NO_CONTENT);
    } catch (error) {
      return res.status(StatusCode.INTERNAL_SERVER_ERROR).json(error);
    }
  }
}

export default ClientController;