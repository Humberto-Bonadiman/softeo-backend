import 'dotenv/config';
import swaggerUi from "swagger-ui-express";
import cors from 'cors';
import express, { NextFunction, Request, Response } from 'express';
import dentistRouter from './routes/dentistRoute';
import loginRouter from './routes/loginRoute';
import clientRouter from './routes/clientRoute';
import swaggerDocument from '../swagger.json';

class App {
  public app;
  constructor() {
    this.app = express();
    this.config();
  }

  private config():void {
    const accessControl = (
      _req: Request,
      res: Response,
      next: NextFunction
    ) => {
      res.header('Access-Control-Allow-Origin', '*');
      res.header('Access-Control-Allow-Methods', 'GET,POST,DELETE,OPTIONS,PUT');
      res.header('Access-Control-Allow-Headers', '*');
      next();
    };

    this.app.use(accessControl);
    this.app.use(express.json());
    this.app.use(cors());

    this.app.get('/', (_req: Request, res: Response) => {
      res.status(200).json({ message: 'Rodando' });
    });
    this.app.use('/dentist', dentistRouter);
    this.app.use('/login', loginRouter);
    this.app.use('/client', clientRouter);
    this.app.use(
      "/docs",
      swaggerUi.serve,
      swaggerUi.setup(swaggerDocument)
    );
  }

  public start(PORT: string | number):void {
    this.app.listen(PORT, () => console.log(
      `Aplicação rodando na porta ${PORT}`,
    ));
  }
}

export { App };

export const { app } = new App();
