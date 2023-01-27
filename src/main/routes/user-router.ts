import express from "express";
import { TokenManager } from "../../utils/helpers/Token-manager";
import { ExpressRouterAdapter } from "../adapters/express-router-adapter";
import { AppendUserToServicePointCompose } from "../composers/appenduser-to-servicepoint";
import { CreateUserRouterComposer } from "../composers/create-user-router-composer";
import { AuthMiddleware } from "../middlewares/auth";

const secret =
  process.env.SECRET_KEY ||
  "nfiowejbgfiwebgjilerbgjiegreNBERJKLBFJLERVGFHLWEJFBFERJKL";

export const userRouter = express.Router();
const createUserRoute = new CreateUserRouterComposer();
const appendUserToServicePointRoute = new AppendUserToServicePointCompose();
const tokenManager = new TokenManager(secret);
const authMiddleware = new AuthMiddleware(tokenManager);

const adapter = new ExpressRouterAdapter();

userRouter.post("/create", adapter.adapt(createUserRoute.compose()));
userRouter.post(
  "/append/service-point",
  (req, res, next) => {
    authMiddleware.isValidToken(req, res, next);
  },
  adapter.adapt(appendUserToServicePointRoute.compose())
);
