const validate = require("../validators/validate");
const { book_validator } = require("../validators/bookValidator");
const { addBook, retrieveBook, getBook } = require("../controllers/bookController")

module.exports = async (app) => {
  let router = require("express").Router();
  router.post("/add", validate(book_validator), addBook);
  router.get("/:uuid", retrieveBook)
  router.get("/", getBook)

  return router;
};
