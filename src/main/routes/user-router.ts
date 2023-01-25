import express from "express";
import { ExpressRouterAdapter } from "../adapters/express-router-adapter";
import { CreateUserRouterComposer } from "../composers/create-user-router-composer";

export const userRouter = express.Router();
const createUserRoute = new CreateUserRouterComposer();

const adapter = new ExpressRouterAdapter();

userRouter.post("/create", adapter.adapt(createUserRoute.compose()));
