const express = require('express');
const app = express();
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const bookRoutes = require('./routes/bookRoutes')

const dbURI = 'mongodb+srv://sonakshi:test1234@bookcluster.xgti3z7.mongodb.net/BookDB?retryWrites=true&w=majority';
mongoose.connect(dbURI)
.then(() => {
    console.log('connected to database');
    app.listen(3000);
})
.catch((err) => {
    console.log(err);
});

app.use(express.urlencoded({extended: true}));
app.use(bodyParser.json());
app.use(bookRoutes);