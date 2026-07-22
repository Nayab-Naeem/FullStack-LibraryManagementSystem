const pool = require("../config/db");

// GET ALL MEMBERS
const getAllMembers = async (req, res, next) => {
    try {
        const result = await pool.query(
            "SELECT * FROM members ORDER BY id"
        );

        res.success(result.rows);

    } catch (error) {
        next(error);
    }
};

// GET MEMBER BY ID
const getMemberById = async (req, res, next) => {
    try {
        const { id } = req.params;

        const result = await pool.query(
            "SELECT * FROM members WHERE id = $1",
            [id]
        );

        if (result.rows.length === 0) {
            return res.status(404).json({
                success: false,
                message: "Member not found"
            });
        }

        res.success(result.rows[0]);

    } catch (error) {
        next(error);
    }
};

// ADD MEMBER
const addMember = async (req, res, next) => {
    try {
        const { name, email, phone } = req.body;

        const result = await pool.query(
            `INSERT INTO members(name, email, phone)
             VALUES($1, $2, $3)
             RETURNING *`,
            [name, email, phone]
        );

        res.status(201).json({
            success: true,
            message: "Member added successfully",
            data: result.rows[0]
        });

    } catch (error) {
        next(error);
    }
};

// UPDATE MEMBER
const updateMember = async (req, res, next) => {
    try {
        const { id } = req.params;
        const { name, email, phone } = req.body;

        const result = await pool.query(
            `UPDATE members
             SET
                name = $1,
                email = $2,
                phone = $3
             WHERE id = $4
             RETURNING *`,
            [name, email, phone, id]
        );

        if (result.rows.length === 0) {
            return res.status(404).json({
                success: false,
                message: "Member not found"
            });
        }

        res.json({
            success: true,
            message: "Member updated successfully",
            data: result.rows[0]
        });

    } catch (error) {
        next(error);
    }
};

// DELETE MEMBER
const deleteMember = async (req, res, next) => {
    try {
        const { id } = req.params;

        const result = await pool.query(
            "DELETE FROM members WHERE id = $1 RETURNING *",
            [id]
        );

        if (result.rows.length === 0) {
            return res.status(404).json({
                success: false,
                message: "Member not found"
            });
        }

        res.json({
            success: true,
            message: "Member deleted successfully",
            data: result.rows[0]
        });

    } catch (error) {
        next(error);
    }
};

module.exports = {
    getAllMembers,
    getMemberById,
    addMember,
    updateMember,
    deleteMember
};