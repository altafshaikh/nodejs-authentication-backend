const express = require("express");
const path = require("path");
const dotenv = require("dotenv");

const userRouter = require("./routes/userRoutes");
const protectRoute = require("./middleware/protectRoute");

dotenv.config({ path: ".env" });
const PORT = process.env.PORT;

const app = express();
app.use(express.json());

app.use(express.static(path.join(__dirname, "public")));

app.use("/users", userRouter);
app.get("/dashboard", protectRoute, (req, res) => {
  console.log(req.currentUser);
  res.sendFile(path.join(__dirname, "public", "dashboard.html"));
});

app.listen(PORT, () => {
  console.log(`Listeninig on Port http://localhost:${PORT}`);
});
