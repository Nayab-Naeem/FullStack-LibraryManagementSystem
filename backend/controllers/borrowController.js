const pool = require("../config/db");

// GET ALL BORROW RECORDS
const getAllBorrowRecords = async (req, res, next) => {
    try {
        const result = await pool.query(`
            SELECT
                br.id,
                b.title,
                m.name AS member,
                br.borrow_date,
                br.return_date,
                br.status
            FROM borrow_records br
            JOIN books b
                ON br.book_id = b.id
            JOIN members m
                ON br.member_id = m.id
            ORDER BY br.id
        `);

        res.success(result.rows);

    } catch (error) {
        next(error);
    }
};

// GET BORROW RECORD BY ID
const getBorrowRecordById = async (req, res, next) => {
    try {
        const { id } = req.params;

        const result = await pool.query(
            `
            SELECT
                br.id,
                b.title,
                m.name AS member,
                br.borrow_date,
                br.return_date,
                br.status
            FROM borrow_records br
            JOIN books b
                ON br.book_id = b.id
            JOIN members m
                ON br.member_id = m.id
            WHERE br.id = $1
            `,
            [id]
        );

        if (result.rows.length === 0) {
            return res.status(404).json({
                success: false,
                message: "Borrow record not found"
            });
        }

        res.success(result.rows[0]);

    } catch (error) {
        next(error);
    }
};

// ADD BORROW RECORD (Business Logic)
const addBorrowRecord = async (req, res, next) => {
    try {

        const {
            book_id,
            member_id,
            borrow_date
        } = req.body;

        // 1. Check if book exists
        const bookResult = await pool.query(
            "SELECT * FROM books WHERE id = $1",
            [book_id]
        );

        if (bookResult.rows.length === 0) {
            return res.status(404).json({
                success: false,
                message: "Book not found"
            });
        }

        // 2. Check if member exists
        const memberResult = await pool.query(
            "SELECT * FROM members WHERE id = $1",
            [member_id]
        );

        if (memberResult.rows.length === 0) {
            return res.status(404).json({
                success: false,
                message: "Member not found"
            });
        }

        // 3. Check book availability
        const book = bookResult.rows[0];

        if (book.available_quantity <= 0) {
            return res.status(400).json({
                success: false,
                message: "Book is currently unavailable"
            });
        }

        // 4. Create borrow record
        const borrowResult = await pool.query(
            `
            INSERT INTO borrow_records
            (
                book_id,
                member_id,
                borrow_date,
                status
            )
            VALUES($1, $2, $3, 'Borrowed')
            RETURNING *
            `,
            [
                book_id,
                member_id,
                borrow_date
            ]
        );

        // 5. Reduce available quantity
        await pool.query(
            `
            UPDATE books
            SET available_quantity = available_quantity - 1
            WHERE id = $1
            `,
            [book_id]
        );

        // 6. Return success
        res.status(201).json({
            success: true,
            message: "Book borrowed successfully",
            data: borrowResult.rows[0]
        });

    } catch (error) {
        next(error);
    }
};

// RETURN BOOK
const updateBorrowRecord = async (req, res, next) => {
    try {

        const { id } = req.params;

        const { return_date } = req.body;

        // 1. Find borrow record
        const borrowResult = await pool.query(
            "SELECT * FROM borrow_records WHERE id = $1",
            [id]
        );

        if (borrowResult.rows.length === 0) {
            return res.status(404).json({
                success: false,
                message: "Borrow record not found"
            });
        }

        const borrowRecord = borrowResult.rows[0];

        // 2. Prevent double return
        if (borrowRecord.status === "Returned") {
            return res.status(400).json({
                success: false,
                message: "Book already returned"
            });
        }

        // 3. Update borrow record
        const updatedRecord = await pool.query(
            `
            UPDATE borrow_records
            SET
                return_date = $1,
                status = 'Returned'
            WHERE id = $2
            RETURNING *
            `,
            [return_date, id]
        );

        // 4. Increase available quantity
       await pool.query(
        `UPDATE books
        SET available_quantity = CASE
    WHEN available_quantity < quantity 
    THEN available_quantity + 1
    ELSE quantity
END
    WHERE id = $1`,

    [borrowRecord.book_id]
);

        // 5. Success response
        res.json({
            success: true,
            message: "Book returned successfully",
            data: updatedRecord.rows[0]
        });

    } catch (error) {
        next(error);
    }
};


// DELETE BORROW RECORD
const deleteBorrowRecord = async (req, res, next) => {
    try {
        const { id } = req.params;

        const result = await pool.query(
            "DELETE FROM borrow_records WHERE id = $1 RETURNING *",
            [id]
        );

        if (result.rows.length === 0) {
            return res.status(404).json({
                success: false,
                message: "Borrow record not found"
            });
        }

        res.json({
            success: true,
            message: "Borrow record deleted successfully",
            data: result.rows[0]
        });

    } catch (error) {
        next(error);
    }
};

module.exports = {
    getAllBorrowRecords,
    getBorrowRecordById,
    addBorrowRecord,
    updateBorrowRecord,
    deleteBorrowRecord
};