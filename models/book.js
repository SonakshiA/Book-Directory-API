const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const bookSchema = new Schema({
    title: {
        type: String,
        required: true,
        unique:true
    },

    isbn: {
        type: Number,
        required: true,
        unique:true
    },
    author: {
        type:String
    }
},{timestamps: true});

const Book = mongoose.model('Book',bookSchema);
module.exports = Book;