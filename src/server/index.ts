import cors from "cors";
import express, { Application } from "express";
import mongoose from "mongoose";
import morgan from "morgan";
import { MEDIA_ROOT, configuration } from "../utils";
import { handleErrors } from "../middlewares";
import logger from "../shared/logger";
import { default as propertyRouter } from "../features/properties/routes";
import { default as filesRouter } from "../features/files/routes";
import { default as mapsRouter } from "../features/maps/routes";

export const dbConnection = async () => {
  try {
    await mongoose.connect(configuration.db as string);
    logger.info(
      `[+]${configuration.name}:${configuration.version} Connected to database Successfully`
    );
  } catch (error) {
    logger.error("[x]Could not connect to database" + error);
    process.exit(1); // Exit the application on database connection error
  }
};

export const configureExpressApp = async (app: Application) => {
  // --------------------middlewares---------------------------

  if (app.get("env") === "development") {
    app.use(morgan("tiny"));
    logger.info(
      `[+]${configuration.name}:${configuration.version} enable morgan`
    );
  }
  app.use(cors());
  app.use(express.json());
  app.use(express.static(MEDIA_ROOT));
  // ------------------End middlewares------------------------

  //------------------- routes --------------------------------

  app.use("/properties", propertyRouter);
  app.use("/files", filesRouter);
  app.use("/maps", mapsRouter);

  //-------------------end routes-----------------------------

  //---------------- error handler -----------------------
  app.use(handleErrors);
  //---------------- end error handler -----------------------
};
