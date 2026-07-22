const pool = require("../config/db");

// Handle unexpected errors using try...catch and Express error middleware

const getAllBooks = async (req, res, next) => {
    try {
        const result = await pool.query("SELECT * FROM books");

        res.success(result.rows);

    } catch (error) {
        next(error);
    }
};
const getBookById = async (req, res, next) => {
    try {
        const { id } = req.params;

        const result = await pool.query(
            "SELECT * FROM books WHERE id = $1",  //parametrized query
            [id]
        );

        if (result.rows.length === 0) {
            return res.status(404).json({
                success: false,
                message: "Book not found"
            });
        }

        res.success(result.rows[0]);

    } catch (error) {
        next(error);
    }
};

const addBook = async (req, res, next) => {
    try {

        const { title, author } = req.body;

        const result = await pool.query(
            "INSERT INTO books(title, author) VALUES($1, $2) RETURNING *",   // Insert the row and immediately return it.
            [title, author]
        );

        res.status(201).json({
            success: true,
            message: "Book added successfully",
            data: result.rows[0]
        });

    } catch (error) {
        next(error);
    }
};

const updateBook = async (req, res, next) => {
    try {

        const { id } = req.params;
        const { title, author } = req.body;

        const result = await pool.query(
            `UPDATE books
             SET title = $1,
                 author = $2
             WHERE id = $3
             RETURNING *`,
            [title, author, id]
        );

        if (result.rows.length === 0) {
            return res.status(404).json({
                success: false,
                message: "Book not found"
            });
        }

        res.json({
            success: true,
            message: "Book updated successfully",
            data: result.rows[0]
        });

    } catch (error) {
        next(error);
    }
};

const deleteBook = async (req, res, next) => {
    try {

        const { id } = req.params;

        const result = await pool.query(
            "DELETE FROM books WHERE id = $1 RETURNING *",
            [id]
        );

        if (result.rows.length === 0) {
            return res.status(404).json({
                success: false,
                message: "Book not found"
            });
        }

        res.json({
            success: true,
            message: "Book deleted successfully",
            data: result.rows[0]
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