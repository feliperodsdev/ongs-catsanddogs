import { setupApp } from "./config/setup";
import { animalRouter } from "./routes/animal-router";
import { loginRouter } from "./routes/login-routes";
import { servicePointRouter } from "./routes/servicepoint-router";
import { userRouter } from "./routes/user-router";
export const app = setupApp();

app.use("/", loginRouter);
app.use("/user", userRouter);
app.use("/service-point", servicePointRouter);
app.use("/animal", animalRouter);

const main = () => {
  const port = process.env.PORT || 3000;
  try {
    app.listen(port, () => console.log(`Running at port: ${port}`));
  } catch (e) {
    console.log(e);
  }
};

main();
