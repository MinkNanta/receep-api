const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const errorMiddleware = require("./middlewares/error");
const notFoundMiddleware = require("./middlewares/notFound");
const { sequelize } = require("./models");
require("dotenv").config();

///////////// Router //////////
const authenticate = require("./middlewares/authenticate");
const authRoute = require("./routes/authRoute");
const menuRoute = require("./routes/menuRoute");
const orderRoute = require("./routes/orderRoute");

// sequelize.sync({ force: true });
// sequelize.sync({ alter: true });

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use(cors());
if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}

app.use("/", authRoute);
app.use("/menu", authenticate, menuRoute);
app.use("/order", authenticate, orderRoute);

app.use(notFoundMiddleware);
app.use(errorMiddleware);

const port = process.env.PORT || 8006;
app.listen(port, () => console.log("server is running on port: " + port));
