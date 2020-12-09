const express = require("express");
const dontenv = require("dotenv");

const blogRouter = require("./routes/blogRoutes");

dontenv.config({ path: ".env" });
const PORT = process.env.PORT;

const app = express();

app.listen(PORT, () => {
  console.log(`Listeninig on Port http://localhost:${PORT}`);
});
