const validate = require("../validators/validate");
const { book_validator, book_update_validator } = require("../validators/bookValidator");
const { addBook, retrieveBook, getBook, deleteBook, update } = require("../controllers/bookController")

module.exports = async (app) => {
  let router = require("express").Router();
  router.post("/add", validate(book_validator), addBook);
  router.get("/:uuid", retrieveBook)
  router.get("/", getBook)
  router.post("/:uuid/delete", deleteBook)
  router.post("/:uuid/update", validate(book_update_validator), update)

  return router;
};
