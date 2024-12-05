var express = require("express");
let Books = require('./booksSchema');
let mongodbConnected = require('./MongodbConnect');
const cors = require('cors');
var app = express();
var bodyparser = require("body-parser");

app.use(bodyparser.json());
app.use(bodyparser.urlencoded({ extended: false }));
app.use(cors());

console.log("BOOKS", Books);

app.get('/', function(req, res) {
    res.send('Welcome to the Books API');
});

// Route to get all books
app.get('/allbooks', async (req, res) => {
    try {
        const allBooks = await Books.find();  // Fetch all books using async/await
        res.status(200).json(allBooks);  // Send the books as a response
    } catch (err) {
        console.error("Error fetching books:", err);
        res.status(500).send('Error fetching books.');
    }
});

// Route to get a single book by ID
app.get('/getbook/:id', function(req, res) {
    const id = req.params.id;
    Books.findById(id, function(err, book) {
        if (err) {
            console.log(err);
        } else {
            res.json(book);
        }
    });
});

// Route to add a new book
app.post('/addbooks', async (req, res) => {
    try {
        const newBook = new Books(req.body);  // Create a new book using the request body
        await newBook.save();  // Save the new book to the database
        res.status(200).json({ message: 'Book added successfully' });  // Send success response
    } catch (err) {
        console.error("Error adding book:", err);
        res.status(400).send('Adding new book failed');
    }
});

// Route to update a book
app.post('/updatebook/:id', function(req, res) {
    const id = req.params.id;
    const updatedBook = req.body;

    console.log("Update id:", id, "Updated book->", updatedBook);

    Books.findByIdAndUpdate(id, {
        booktitle: updatedBook.booktitle,
        PubYear: updatedBook.PubYear,
        author: updatedBook.author,
        Topic: updatedBook.Topic,
        format: updatedBook.format
    }, function(err, docs) {
        if (err) {
            console.log(err);
        } else {
            res.status(200).json({ 'books': 'Book updated successfully' });
        }
    });
});

// Route to delete a book
app.post('/deleteBook/:id', function(req, res) {
    const id = req.params.id;

    console.log("Deleting book with ID:", id);

    Books.findByIdAndDelete(id, function(err, docs) {
        if (err) {
            console.log(err);
        } else {
            res.status(200).send('Book deleted successfully');
        }
    });
});

app.listen(5000, function() {
    console.log("Server is running on port 5000");
});
