import { setupApp } from "./config/setup";
import { loginRouter } from "./routes/login-routes";
import { userRouter } from "./routes/user-router";
export const app = setupApp();

app.use("/", loginRouter);
app.use("/user", userRouter);

const main = () => {
  const port = process.env.PORT || 3000;
  try {
    app.listen(port, () => console.log(`Running at port: ${port}`));
  } catch (e) {
    console.log(e);
  }
};

main();
