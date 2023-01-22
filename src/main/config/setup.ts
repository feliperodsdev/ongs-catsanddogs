import { cors } from "../middlewares/cors";
import { jsonParser } from "../middlewares/jsonParser";

export const configApp = (app: any) => {
  app.disable("x-powered-by");
  app.use(cors());
  app.use(jsonParser);
};
