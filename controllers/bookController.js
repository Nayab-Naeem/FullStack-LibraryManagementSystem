const books = require("../models/bookModel");

// Handle unexpected errors using try...catch and Express error middleware

const getAllBooks = async (req, res, next) => {
    try {
        res.success(books);
    } catch (error) {
        next(error);
    }
};

const getBookById = async (req, res, next) => {
    try {
        const bookId = Number(req.params.id);

        const book = books.find((book) => book.id === bookId);

        if (!book) {
            return res.status(404).json({
                success: false,
                message: "Book not found"
            });
        }

        res.success(book);

    } catch (error) {
        next(error);
    }
};

const addBook = async (req, res, next) => {
    try {
        const newBook = {
            id: books.length + 1,
            title: req.body.title,
            author: req.body.author
        };

        books.push(newBook);

        res.status(201).json({
            success: true,
            message: "Book added successfully",
            data: newBook
        });

    } catch (error) {
        next(error);
    }
};

const updateBook = async (req, res, next) => {
    try {
        const bookId = Number(req.params.id);

        const book = books.find((book) => book.id === bookId);

        if (!book) {
            return res.status(404).json({
                success: false,
                message: "Book not found"
            });
        }

        book.title = req.body.title;
        book.author = req.body.author;

        res.json({
            success: true,
            message: "Book updated successfully",
            data: book
        });

    } catch (error) {
        next(error);
    }
};

const deleteBook = async (req, res, next) => {
    try {
        const bookId = Number(req.params.id);

        const index = books.findIndex((book) => book.id === bookId);

        if (index === -1) {
            return res.status(404).json({
                success: false,
                message: "Book not found"
            });
        }

        const deletedBook = books.splice(index, 1);

        res.json({
            success: true,
            message: "Book deleted successfully",
            data: deletedBook[0]
        });

    } catch (error) {
        next(error);
    }
};

module.exports = {
    getAllBooks,
    getBookById,
    addBook,
    updateBook,
    deleteBook
};