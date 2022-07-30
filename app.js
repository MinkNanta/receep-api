const path = require("path");
require("dotenv").config();

const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const authenticate = require("./middlewares/authenticate");
const errorMiddleware = require("./middlewares/error");
const notFoundMiddleware = require("./middlewares/notFound");
const authRoute = require("./routes/authRoute");

// const { sequelize } = require("./models");
// sequelize.sync({ force: true });

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use(cors());
if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}

// app.use("/", authRoute);
app.get("/", (q, res) => {
  res.send(hi);
});

app.use(notFoundMiddleware);
app.use(errorMiddleware);

const port = process.env.PORT || 8006;
app.listen(port, () => console.log("server is running on port: " + port));
