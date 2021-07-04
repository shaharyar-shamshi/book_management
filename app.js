const express = require("express");
const path = require("path");
const logger = require("morgan");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const compression = require("compression");
const app = require("express")();
const cors = require("cors");
const lusca = require("lusca");
const helmet = require("helmet");
const useragent = require("express-useragent");

app.set("trust proxy", true);
app.set("view engine", "hbs");
/*app.use(
  cors({
    optionsSuccessStatus: 200,
  })
);*/
app.use(cors());

app.use(logger("dev"));
app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ extended: false }));
app.use(compression());

app.use(useragent.express());

app.use(
  lusca({
    xframe: "SAMEORIGIN",
    xssProtection: true,
  })
);
app.use(
  helmet({
    dnsPrefetchControl: true,
    noSniff: true,
    xssFilter: { setOnOldIE: false },
  })
);

const routesBootstrap = async () => {
  let indexRoute = await require("./routes/index")(app);
  let routes = {
  };
  for (let i in routes) app.use(`/${i}`, routes[i]);
  app.use("/", indexRoute);
  return app;
};

module.exports = routesBootstrap;
