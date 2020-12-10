const express = require("express");
const path = require("path");
const dontenv = require("dotenv");

const userRouter = require("./routes/userRoutes");

dontenv.config({ path: ".env" });
const PORT = process.env.PORT;

const app = express();
app.use(express.json());

app.use(express.static(path.join(__dirname, "public")));

app.get("/dashboard", (req, res, next) => {
  res.status(200);
  res.sendFile(path.join(__dirname, "public", "dashboard.html"));
});
app.use("/users", userRouter);

app.listen(PORT, () => {
  console.log(`Listeninig on Port http://localhost:${PORT}`);
});
