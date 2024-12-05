const mongoose = require('mongoose');

// Define the schema for books
const BookSchema = new mongoose.Schema({
    booktitle: {
        type: String,
        required: true,  // Book title is required
    },
    PubYear: {
        type: Number,  // Optional: Publication year of the book
    },
    author: {
        type: String,  // Author name of the book
    },
    Topic: {
        type: String,  // Topic of the book
    },
    format: {
        type: String,  // Format of the book (e.g., paperback, hardcover)
    },
});

// Create and export the model
module.exports = mongoose.model('Book', BookSchema, 'BookCollection2');
