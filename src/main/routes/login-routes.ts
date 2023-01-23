import express from "express";
import { LoginRouterComposer } from "../composers/login-router-composer";
import { ExpressRouterAdapter } from "../adapters/express-router-adapter";

export const loginRouter = express.Router();
const loginRouterComposer = new LoginRouterComposer();

const adapter = new ExpressRouterAdapter();

loginRouter.post("/auth", adapter.adapt(loginRouterComposer.compose()));
