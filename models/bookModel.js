const mongoose = require("mongoose");
const { v4: uuidv4 } = require('uuid');

let BookSchema = new mongoose.Schema({
  uuid: { type: String, default: function genUUID() {
    return uuidv4()
}},
  name: { type: String, required: true},
  author: { type: String, required: true },
  number_of_copy: { type: Number, required: true},
  remaining_copy: { type: Number, required: true},
  release_date: { type: Date, required: true }
},
{
  timestamps: true
});

BookSchema.index({name: 1, author: 1}, { unique: true})



BookSchema.pre('save', function (next) {
    this.remaining_copy = this.get('number_of_copy'); // considering _id is input by client
    
    next();
});
module.exports = mongoose.model("Book", BookSchema);