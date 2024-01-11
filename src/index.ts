import "dotenv/config";
import express from "express";
import { createServer } from "http";
import { configureExpressApp, dbConnection } from "./server";
import { configuration } from "./utils";
import { registry } from "./utils";
import { toNumber } from "lodash";
import logger from "./shared/logger";

const startServer = async () => {
  const app = express();
  const httpServer = createServer(app);
  //-------------- connect to database---------------------
  await dbConnection();
  //-------------- end database connecivity      ---------------------
  // -----------------Message broker--------------------------
  // -----------------End Message broker---------------------
  await configureExpressApp(app);
  const port = configuration.port ?? 0;
  httpServer.listen(port, () => {
    const address: any = httpServer.address();

    const bind =
      typeof address === "string" ? `pipe ${address}` : `port ${address?.port}`;
    logger.info(
      `[+]${configuration.name}:${configuration.version} listening on ${bind}`
    );
  });
};

startServer();
