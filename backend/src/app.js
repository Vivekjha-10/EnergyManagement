const express = require('express');
const cors = require('cors');
const config = require('./config/config');
const createError = require("http-errors");
const path = require("path");
const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./swagger/swagger.json');
const expressIp = require("express-ip");

const reqTimeout = require('./middlewares/requestTimeout')
const allowedHttpMethods = require('./middlewares/allowedHttpMethod')
const malformedRequest = require('./middlewares/malformedRequest')
const notFound = require('./middlewares/notFound')


const corsOptions = {
  origin: "*",
  methods: ["GET", "PUT", "PATCH", "POST", "DELETE"],
  credentials: true,
  /* preflightContinue: true,
  optionsSuccessStatus: 200, */ // some legacy browsers (IE11, various SmartTVs) choke on 204
  allowedHeaders: ["Content-Type", "x-auth-token"],
  exposedHeaders: ["x-auth-token"]
};

const app = express()

require('./database/mysql.connection')

app.disable('x-powered-by')
/* app.use(bodyParser.json({ limit: "500mb" })); */
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(cors(corsOptions));
app.use(express.static(path.join(__dirname, "public")));
app.use(express.static(path.join(__dirname, "logs")));
app.use(expressIp().getIpInfoMiddleware);
app.get("/favicon.ico", (req, res) => res.status(204).end());

const options = {
  swaggerOptions: {
    defaultModelsExpandDepth: -1,
  },
}

//api docs
app.use(
  '/Management/api/v1/api-docs/energyManagementSystem',
  swaggerUi.serve,
  swaggerUi.setup(swaggerDocument, options)
)

app.use(malformedRequest)
app.use(allowedHttpMethods)
app.use(reqTimeout)

app.use("/Management/api", require("./api"));

app.use(notFound)

module.exports = app;