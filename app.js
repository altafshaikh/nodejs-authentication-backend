const express = require("express");
const path = require("path");
const dotenv = require("dotenv");
const cors = require("cors");
const mongoose = require("mongoose");

const userRouter = require("./routes/userRoutes");
const protectRoute = require("./middleware/protectRoute");
const authUser = require("./middleware/authUser");
const adapter = require("./adapter/storageAdapter");

dotenv.config({ path: ".env" });
const PORT = process.env.PORT;

let dbURI;

if (process.env.DEBUG) {
  dbURI = process.env.LOCAL_DB_URL;
} else {
  dbURI = process.env.DATABASE_URL;
}

const connect = mongoose.connect(dbURI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

connect.then(
  (db) => {
    console.log("Connected Successfully to Mongodb Server");
  },
  (err) => {
    console.log(err);
  }
);

const app = express();

app.use(cors());
app.use(express.json());

app.use(express.static(path.join(__dirname, "public")));

app.use("/users", userRouter);
app.post("/auth", authUser, (req, res, next) => {
  if (req.currentUser) {
    res.status(200).json(req.currentUser);
  } else {
    res.status(401).json({});
  }
});
app.get("/dashboard", protectRoute, (req, res) => {
  console.log(req.currentUser);
  res.sendFile(path.join(__dirname, "public", "dashboard.html"));
});

app.listen(PORT, () => {
  console.log(`Listeninig on Port http://localhost:${PORT}`);
});
