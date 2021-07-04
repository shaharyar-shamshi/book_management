const path = require("path");
console.log(`Server enviornment: ${process.env.NODE_ENV}`);

if (process.env.NODE_ENV == "production") {
  require("dotenv").config({
    path: path.resolve(__dirname, "../.env.production"),
  });
} else if (process.env.NODE_ENV == "development") {
  console.log("Loading dev env");
  require("dotenv").config({
    path: path.resolve(__dirname, "../.env.development"),
  });
} else {
  /* Adding this else block due no support of export NODE_ENV in windows
        So this works a fallback for windows in dev environment
    */
  require("dotenv").config({
    path: path.resolve(__dirname, "../.env.development"),
  });
}

module.exports = {
  db: process.env.DB
};
