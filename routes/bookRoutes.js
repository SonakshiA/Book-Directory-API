const express = require('express');
const Book = require('../models/book');
const { boolean } = require('webidl-conversions');
const router = express.Router();

router.get('/',(req,res) => {
    res.redirect('/books');
});

router.get('/books', (req,res) => {
    Book.find().then((result) => {
        res.send(result)
    })
});

router.get('/books/:id',(req,res) => {
    const id = req.params.id;
    Book.findOne({isbn:id}).then((result) => {
        res.send(result);
    }).catch((err) =>{
        res.send('Book Not Found');
    })
});

router.post('/books',(req,res) => {
    const book = new Book(req.body);

    book.save().then((result) => res.send('Book Uploaded')).catch((err) => console.log(err))
});


//updating a book

router.put('/books/:id', async function(req,res) {
    const id = req.params.id;

    const {
        title,
        author
    } = req.body;

    const bookExists =  await Book.findOne({isbn:id});
    if(!bookExists) return res.send('Book does not exist');

    const updateField = (val,prev) => !val ? prev : val;

    const updatedBook = {
        ...bookExists, //old values of object
        title: updateField(title,bookExists.title),
        author: updateField(author, bookExists.author)
    };

    await Book.updateOne({isbn:id},{$set: {title:updatedBook.title, author: updatedBook.author}})

    res.status(200).send("Book Updated");

})

router.delete('/books/:id',(req,res) => {
    const id = req.params.id;
    Book.deleteOne({isbn:id}).then((result) => {
        console.log("Book Deleted");
        res.send("Book Deleted Successfully")
    }).catch((err) => {
        console.log(err);
    })
})

module.exports = router;