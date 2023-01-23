import { cors } from "../middlewares/cors";
import express from "express";

export const setupApp = () => {
  const app = express();
  app.disable("x-powered-by");
  app.use(cors());
  app.use(express.json());
  return app;
};
