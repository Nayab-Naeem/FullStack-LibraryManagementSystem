const pool = require("../config/db");

// GET ALL CATEGORIES
const getAllCategories = async (req, res, next) => {
    try {
        const result = await pool.query(
            "SELECT * FROM categories ORDER BY id"
        );

        res.success(result.rows);

    } catch (error) {
        next(error);
    }
};

// GET CATEGORY BY ID
const getCategoryById = async (req, res, next) => {
    try {
        const { id } = req.params;

        const result = await pool.query(
            "SELECT * FROM categories WHERE id = $1",
            [id]
        );

        if (result.rows.length === 0) {
            return res.status(404).json({
                success: false,
                message: "Category not found"
            });
        }

        res.success(result.rows[0]);

    } catch (error) {
        next(error);
    }
};

// ADD CATEGORY
const addCategory = async (req, res, next) => {
    try {
        const { name } = req.body;

        const result = await pool.query(
            `INSERT INTO categories(name)
             VALUES($1)
             RETURNING *`,
            [name]
        );

        res.status(201).json({
            success: true,
            message: "Category added successfully",
            data: result.rows[0]
        });

    } catch (error) {
        next(error);
    }
};

// UPDATE CATEGORY
const updateCategory = async (req, res, next) => {
    try {
        const { id } = req.params;
        const { name } = req.body;

        const result = await pool.query(
            `UPDATE categories
             SET name = $1
             WHERE id = $2
             RETURNING *`,
            [name, id]
        );

        if (result.rows.length === 0) {
            return res.status(404).json({
                success: false,
                message: "Category not found"
            });
        }

        res.json({
            success: true,
            message: "Category updated successfully",
            data: result.rows[0]
        });

    } catch (error) {
        next(error);
    }
};

// DELETE CATEGORY
const deleteCategory = async (req, res, next) => {
    try {
        const { id } = req.params;

        const result = await pool.query(
            "DELETE FROM categories WHERE id = $1 RETURNING *",
            [id]
        );

        if (result.rows.length === 0) {
            return res.status(404).json({
                success: false,
                message: "Category not found"
            });
        }

        res.json({
            success: true,
            message: "Category deleted successfully",
            data: result.rows[0]
        });

    } catch (error) {
        next(error);
    }
};

module.exports = {
    getAllCategories,
    getCategoryById,
    addCategory,
    updateCategory,
    deleteCategory
};