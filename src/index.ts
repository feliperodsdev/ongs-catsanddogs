import express from "express";


const app = express();

app.use(express.json());

const main = () => {
  const port = process.env.PORT || 3000;
  try {
    app.listen(port, () => console.log(`Running at port: ${port}`));
  } catch (e) {
    console.log(e);
  }
};

main();
