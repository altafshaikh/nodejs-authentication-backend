const express = require("express");
const dontenv = require("dotenv");

const userRouter = require("./routes/userRoutes");

dontenv.config({ path: ".env" });
const PORT = process.env.PORT;

const app = express();
app.use(express.json());

app.use("/users", userRouter);

app.listen(PORT, () => {
  console.log(`Listeninig on Port http://localhost:${PORT}`);
});
