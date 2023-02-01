import express from "express";
import { TokenManager } from "../../utils/helpers/Token-manager";

import { ExpressRouterAdapter } from "../adapters/express-router-adapter";
import { CreateAnAnimalComposer } from "../composers/create-an-animal";
import { UpdatedAnimalAdoptedComposer } from "../composers/updated-an-animaladopted";
import { AuthMiddleware } from "../middlewares/auth";

const secret =
  process.env.SECRET_KEY ||
  "nfiowejbgfiwebgjilerbgjiegreNBERJKLBFJLERVGFHLWEJFBFERJKL";

export const animalRouter = express.Router();
const createAnimalRouterComposer = new CreateAnAnimalComposer();
const updatedAnimalAdoptedCompose = new UpdatedAnimalAdoptedComposer();
const tokenManager = new TokenManager(secret);
const authMiddleware = new AuthMiddleware(tokenManager);

const adapter = new ExpressRouterAdapter();

animalRouter.post(
  "/create",
  (req, res, next) => {
    authMiddleware.isValidToken(req, res, next);
  },
  adapter.adapt(createAnimalRouterComposer.compose())
);

animalRouter.post(
  "/update/:animal_id",
  (req, res, next) => {
    authMiddleware.isValidToken(req, res, next);
  },
  adapter.adapt(updatedAnimalAdoptedCompose.compose())
);
