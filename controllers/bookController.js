const books = require("../models/bookModel");


const getAllBooks = (req, res) => {
    res.json(books);
};


const getBookById = (req, res) => {
    const bookId = Number(req.params.id);

    const book = books.find((book) => book.id === bookId);

    if (!book) {
        return res.status(404).json({
            message: "Book not found"
        });
    }

    res.json(book);
};

const addBook = (req, res) => {
    const newBook = {
        id: books.length + 1,
        title: req.body.title,
        author: req.body.author
    };

    books.push(newBook);

    res.status(201).json({
        message: "Book added successfully",
        book: newBook
    });
};

const updateBook = (req, res) => {
    const bookId = Number(req.params.id);

    const book = books.find((book) => book.id === bookId);

    if (!book) {
        return res.status(404).json({
            message: "Book not found"
        });
    }

    book.title = req.body.title;
    book.author = req.body.author;

    res.json({
        message: "Book updated successfully",
        book
    });
};

const deleteBook = (req, res) => {
    const bookId = Number(req.params.id);

    const index = books.findIndex((book) => book.id === bookId);

    if (index === -1) {
        return res.status(404).json({
            message: "Book not found"
        });
    }

    const deletedBook = books.splice(index, 1);

    res.json({
        message: "Book deleted successfully",
        book: deletedBook[0]
    });
};

module.exports = {
    getAllBooks,
    getBookById,
    addBook,
    updateBook,
    deleteBook
};