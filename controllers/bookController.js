const tools = require("../lib/tools");
const Book = require("../models/bookModel")


exports.addBook = async (req, res, next) => {
    let book = await Book.findOne({name: req.body.name, author: req.body.author}, '-_id');
    if (book) {
        book.number_of_copy = book.number_of_copy + (req.body.number_of_copy ? req.body.number_of_copy: 1);
        await book.save();
    } else {
       book = new Book({
           name: req.body.name,
           author: req.body.author,
           number_of_copy: req.body.number_of_copy,
           release_date: req.body.release_date,
           remaining_copy: req.body.number_of_copy,
       })
           try {
           book = await book.save()
           } catch (err) {
               if (err.name === 'MongoError' && err.code === 11000) {
                   return res.json(await tools.getResult(422, "Book already exist", "", book))
               } else {
                return res.json( await tools.getResult(500, "some error occured", "",  ""))
               }
           }
        
    }
    return res.json( await tools.getResult(200,"Book added successfully","",book))
}

exports.retrieveBook = async (req, res) => {
    const book = await Book.findOne({uuid: req.params.uuid}, '-_id');
    if (book) {
        return res.json( await tools.getResult(200,"","",book))
    } else {
        return res.json(await tools.getResult(404, "Not found", "", ""))
    }
}
exports.getBook = async (req, res) => {
    const book = await Book.find({}, '-_id');
    return res.json( await tools.getResult(200,"","",book))
}