const express = require("express");
const path = require("path");
const dotenv = require("dotenv");
const cors = require("cors");

const userRouter = require("./routes/userRoutes");
const storageAdapter = require("./adapter/storageAdapter");

dotenv.config({ path: ".env" });
const PORT = process.env.PORT;

const app = express();

app.use(cors());
app.use(express.json());

app.use(express.static(path.join(__dirname, "public")));

app.use("/users", userRouter);
app.post("/auth", storageAdapter.middlewares.authUser, (req, res, next) => {
  if (req.currentUser) {
    res.status(200).json(req.currentUser);
  } else {
    res.status(401).json({});
  }
});
app.get("/dashboard", storageAdapter.middlewares.authUser, (req, res) => {
  res.sendFile(path.join(__dirname, "public", "dashboard.html"));
});

app.listen(PORT, () => {
  console.log(`Listeninig on Port http://localhost:${PORT}`);
});
