/* tslint:disable no-console */

import * as cluster from 'cluster';
import * as express from 'express';
import { Router } from 'express';
import * as cookieParser from 'cookie-parser';
import * as compression from 'compression';
import { cpus } from 'os';
import { Application } from 'express';
import renderer from './middlewares/renderer';
import tracing from './middlewares/tracing';
import health from './middlewares/health';
import { PRODUCTION } from './utils/env';

interface ServerConfig {
  routes: Router;
  staticAssets: string[];
}

const Server = (config: ServerConfig) => {
  const {
    routes,
    staticAssets,
  } = config;

  const app: Application = express();

  app.use(compression());
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));
  app.use(cookieParser());
  app.use(tracing);

  // add react renderer
  app.use(renderer);

  // mount application routes
  if (routes) {
    app.use(routes);
  }

  // simple and basic /health endpoint
  app.get('/health', health);

  staticAssets.forEach(staticConfig => app.use(express.static(staticConfig)));

  const start = () => {
    const port = 3000;
    const host = '0.0.0.0';

    app.listen(port, host, () => console.log(`App listening on port ${port}`));
  };

  const startCluster = () => {
    if (cluster.isMaster) {
      const workers = cpus().length; // TODO: make it configurable
      for (let i = 0; i < workers; i += 1) {
        cluster.fork();
      }

      cluster.on('online', (worker) => {
        console.info(`Worker ${worker.process.pid} is online`);
      });

      cluster.on('exit', (worker) => {
        console.info(`Worker ${worker.process.pid} died`);
        console.info('Starting a new worker');
        cluster.fork();
      });
    } else {
      start();
    }
  };

  if (PRODUCTION) {
    startCluster();
  } else {
    start();
  }
};

export default Server;
