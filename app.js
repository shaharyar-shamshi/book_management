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
const secrets = require("./config/config")

mongoose.Promise = global.Promise
try {
  mongoose.connect(
    secrets.db,
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      serverSelectionTimeoutMS: 5000,
    },
    () => console.log("Mongodb database is connected", mongoose.connection.readyState)
  );
} catch (error) {
  console.error(error);
  console.log("Mongodb database could not connect");
  process.exit(1);
}
console.log(mongoose.connection.readyState);
// Hello world
// app.use(cors());
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
    /*csrf: {
		key: '_csrf',
		secret: secrets.csrf,
		cookie: '_csrf',
		angular: true
	},*/
    xframe: "SAMEORIGIN",
    xssProtection: true,
    // hsts: secrets.hstsMaxAge,
  })
);
app.use(
  helmet({
    dnsPrefetchControl: true,
    // hidePoweredBy: { setTo: secrets.poweredBy },
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
