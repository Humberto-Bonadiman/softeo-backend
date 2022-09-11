import { Request, Response } from 'express';
import DentistService from '../services/dentistService';
import StatusCode from '../enums/StatusCode';
import { dentistInterface } from '../interfaces/dentistInterface';

export default class DentistController {
  public async create(req: typeof Request, res: typeof Response) {
    try {
      const { email, name, password }: dentistInterface = req.body;
      const dentistService = new DentistService();
      const createDentist = await dentistService.create({ email, name, password });
      return res.status(StatusCode.OK).json(createDentist);
    } catch (error) {
      return res.status(StatusCode.INTERNAL_SERVER_ERROR).json(error);
    }
  }

  public async listAll(_req: typeof Request, res: typeof Response) {
    try {
      const dentistService = new DentistService();
      const listAllDentists = await dentistService.listAll();
      return res.status(StatusCode.OK).json(listAllDentists);
    } catch (error) {
      return res.status(StatusCode.INTERNAL_SERVER_ERROR).json(error);
    }
  }

  public async login(req: typeof Request, res: typeof Response) {
    try {
      const {email, password} = req.body;
      const loginDentist = await new DentistService().login(email, password);
      return res.status(StatusCode.OK).json(loginDentist);
    } catch (error) {
      return res.status(StatusCode.INTERNAL_SERVER_ERROR).json(error);
    }
  }
}