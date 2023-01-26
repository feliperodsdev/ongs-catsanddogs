import express from "express";
import { TokenManager } from "../../utils/helpers/Token-manager";
import { ExpressRouterAdapter } from "../adapters/express-router-adapter";
import { CreateServicePointComposer } from "../composers/create-servicepoint-composer";
import { AuthMiddleware } from "../middlewares/auth";

const secret =
  process.env.SECRET_KEY ||
  "nfiowejbgfiwebgjilerbgjiegreNBERJKLBFJLERVGFHLWEJFBFERJKL";

export const servicePointRouter = express.Router();
const createServicePointComposer = new CreateServicePointComposer();
const tokenManager = new TokenManager(secret);
const authMiddleware = new AuthMiddleware(tokenManager);
const adapter = new ExpressRouterAdapter();

servicePointRouter.post(
  "/create",
  (req, res, next) => {
    authMiddleware.isValidToken(req, res, next);
  },
  adapter.adapt(createServicePointComposer.compose())
);
