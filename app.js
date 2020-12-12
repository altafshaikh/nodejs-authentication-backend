const express = require("express");
const path = require("path");
const dotenv = require("dotenv");
const cors = require("cors");

const userRouter = require("./routes/userRoutes");
const protectRoute = require("./middleware/protectRoute");
const authUser = require("./middleware/authUser");

dotenv.config({ path: ".env" });
const PORT = process.env.PORT;

const app = express();

app.use(cors());
app.use(express.json());

app.use(express.static(path.join(__dirname, "public")));

app.use("/users", userRouter);
app.post("/auth", authUser, (req, res, next) => {
  if (req.currentUser) {
    res.status(200).json({ authorize: true });
  } else {
    res.status(401).json({ authorize: false });
  }
});
app.get("/dashboard", protectRoute, (req, res) => {
  console.log(req.currentUser);
  res.sendFile(path.join(__dirname, "public", "dashboard.html"));
});

app.listen(PORT, () => {
  console.log(`Listeninig on Port http://localhost:${PORT}`);
});
