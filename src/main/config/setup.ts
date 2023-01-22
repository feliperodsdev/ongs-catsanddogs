import { cors } from "../middlewares/cors";

export const configApp = (app: any) => {
  app.disable("x-powered-by");
  app.use(cors());
};
