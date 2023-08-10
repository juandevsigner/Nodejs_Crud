import express from 'express';
import displayRoutes from 'express-routemap';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import hpp from 'hpp';
import helmet from 'helmet';

import { API_VERSION, ConfigServer, NODE_ENV, PORT } from './config/config';
import { Routes } from './interfaces/route.interface';
import { logger } from './utils/logger';
import { corsConfig } from './config/cors.config';
import { DataSource } from 'typeorm';

class App extends ConfigServer {
  public app: express.Application;
  public env: string;
  public port: number;
  public server: any;

  constructor(routes: Routes[]) {
    super();
    this.app = express();
    this.port = Number(PORT) || 5000;
    this.env = NODE_ENV || 'development';

    this.connectToDatabase();
    this.initializeMiddlewares();
    this.initializedRoutes(routes);
    this.initializeSwagger();
    this.initializeErrorHanding();
  }

  public getServer() {
    return this.app;
  }

  public closeServer(done?: any) {
    this.server = this.app.listen(this.port, () => {
      done();
    });
  }

  public initializedRoutes(routes: Routes[]) {
    routes.forEach((route) => {
      this.app.use(`/api/${API_VERSION}`, route.router);
    });
  }

  private async connectToDatabase(): Promise<DataSource | void> {
    return this.initConnect
      .then(() => {
        logger.info(`================================`);
        logger.info(`==== DB Connection success!! ===`);
        logger.info(`================================`);
      })
      .catch((err) => {
        console.error(err.message);
      });
  }

  private initializeMiddlewares() {
    this.app.use(cors(corsConfig));
    this.app.use(hpp());
    this.app.use(helmet());
    this.app.use(express.json());
    this.app.use(express.urlencoded({ extended: true }));
    this.app.use(cookieParser());
  }

  public listen() {
    this.app.listen(this.port, () => {
      displayRoutes(this.app);
      logger.info(`================================`);
      logger.info(`======= ENV: ${this.env} =======`);
      logger.info(`=App listening on the port ${this.port}=`);
      logger.info(`================================`);
    });
  }

  // eslint-disable-next-line @typescript-eslint/no-empty-function
  private initializeErrorHanding() {}
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  private initializeSwagger() {}
}

export default App;
