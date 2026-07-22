const pool = require("../config/db");

// GET ALL AUTHORS
const getAllAuthors = async (req, res, next) => {
    try {
        const result = await pool.query(
            "SELECT * FROM authors ORDER BY id"
        );

        res.success(result.rows);
    } catch (error) {
        next(error);
    }
};

// GET AUTHOR BY ID
const getAuthorById = async (req, res, next) => {
    try {
        const { id } = req.params;

        const result = await pool.query(
            "SELECT * FROM authors WHERE id = $1",
            [id]
        );

        if (result.rows.length === 0) {
            return res.status(404).json({
                success: false,
                message: "Author not found"
            });
        }

        res.success(result.rows[0]);

    } catch (error) {
        next(error);
    }
};

// ADD AUTHOR
const addAuthor = async (req, res, next) => {
    try {

        const { name, email, country } = req.body;

        const result = await pool.query(
            `INSERT INTO authors(name, email, country)
             VALUES($1, $2, $3)
             RETURNING *`,
            [name, email, country]
        );

        res.status(201).json({
            success: true,
            message: "Author added successfully",
            data: result.rows[0]
        });

    } catch (error) {
        next(error);
    }
};

// UPDATE AUTHOR
const updateAuthor = async (req, res, next) => {
    try {

        const { id } = req.params;
        const { name, email, country } = req.body;

        const result = await pool.query(
            `UPDATE authors
             SET
                name = $1,
                email = $2,
                country = $3
             WHERE id = $4
             RETURNING *`,
            [name, email, country, id]
        );

        if (result.rows.length === 0) {
            return res.status(404).json({
                success: false,
                message: "Author not found"
            });
        }

        res.json({
            success: true,
            message: "Author updated successfully",
            data: result.rows[0]
        });

    } catch (error) {
        next(error);
    }
};

// DELETE AUTHOR
const deleteAuthor = async (req, res, next) => {
    try {

        const { id } = req.params;

        const result = await pool.query(
            "DELETE FROM authors WHERE id = $1 RETURNING *",
            [id]
        );

        if (result.rows.length === 0) {
            return res.status(404).json({
                success: false,
                message: "Author not found"
            });
        }

        res.json({
            success: true,
            message: "Author deleted successfully",
            data: result.rows[0]
        });

    } catch (error) {
        next(error);
    }
};

module.exports = {
    getAllAuthors,
    getAuthorById,
    addAuthor,
    updateAuthor,
    deleteAuthor
};