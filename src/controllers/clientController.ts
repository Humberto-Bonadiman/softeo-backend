import { Request, Response } from 'express';
import StatusCode from '../enums/StatusCode';
import { clientInterface, clientWithDateInterface } from '../interfaces/clientInterface';
import ClientService from '../services/clientService';

class ClientController {
  public async create(
    req: typeof Request,
    res: typeof Response,
  ) {
    try {
      const { authorization } = req.headers;
      const elementsClient: clientInterface = req.body;
      const clientService = new ClientService();
      const createClient = await clientService.create(elementsClient, authorization as string);
      return res.status(StatusCode.CREATED).json(createClient);
    } catch (error) {
      return res.status(StatusCode.INTERNAL_SERVER_ERROR).json(error);
    }
  }

  public async findAll(
    _req: typeof Request,
    res: typeof Response,
  ) {
    try {
      const clientService = new ClientService();
      const findAllClients = await clientService.findAll();
      return res.status(StatusCode.OK).json(findAllClients);
    } catch (error) {
      return res.status(StatusCode.INTERNAL_SERVER_ERROR).json(error);
    }
  }

  public async findById(
    req: typeof Request,
    res: typeof Response,
  ) {
    try {
      const { id } = req.params;
      const clientService = new ClientService();
      const findClientById = await clientService.findById(id);
      return res.status(StatusCode.OK).json(findClientById);
    } catch (error) {
      return res.status(StatusCode.INTERNAL_SERVER_ERROR).json(error);
    }
  }

  public async findByDentistId(
    req: typeof Request,
    res: typeof Response,
  ) {
    try {
      const { dentistId } = req.params;
      const clientService = new ClientService();
      const findClientByDentistId = await clientService.findByDentistId(dentistId);
      return res.status(StatusCode.OK).json(findClientByDentistId);
    } catch (error) {
      return res.status(StatusCode.INTERNAL_SERVER_ERROR).json(error);
    }
  }

  public async updateById(
    req: typeof Request,
    res: typeof Response,
  ) {
    try {
      const { id } = req.params;
      const elementsBody: clientWithDateInterface = req.body;
      const clientService = new ClientService();
      const updateClientById = await clientService.updateById(id, elementsBody);
      return res.status(StatusCode.OK).json(updateClientById);
    } catch (error) {
      return res.status(StatusCode.INTERNAL_SERVER_ERROR).json(error);
    }
  }

  public async deleteById(
    req: typeof Request,
    res: typeof Response,
  ) {
    try {
      const { id } = req.params;
      const clientService = new ClientService();
      const deleteClient = await clientService.deleteById(id);
      return res.status(StatusCode.OK).json(deleteClient);
    } catch (error) {
      return res.status(StatusCode.INTERNAL_SERVER_ERROR).json(error);
    }
  }
}

export default ClientController;