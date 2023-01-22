import express from "express";
import { configApp } from "./config/setup";

export const app = express();
configApp(app);

const main = () => {
  const port = process.env.PORT || 3000;
  try {
    app.listen(port, () => console.log(`Running at port: ${port}`));
  } catch (e) {
    console.log(e);
  }
};

main();
