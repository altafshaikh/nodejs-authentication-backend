const express = require("express");
const path = require("path");
const dontenv = require("dotenv");

const userRouter = require("./routes/userRoutes");
const protectRoute = require("./middleware/protectRoute");

dontenv.config({ path: ".env" });
const PORT = process.env.PORT;

const app = express();
app.use(express.json());

app.use(express.static(path.join(__dirname, "public")));

app.use("/users", userRouter);
app.get("/dashboard", protectRoute, (req, res) => {
  res.sendFile(path.join(__dirname, "public", "dashboard.html"));
});

app.listen(PORT, () => {
  console.log(`Listeninig on Port http://localhost:${PORT}`);
});
