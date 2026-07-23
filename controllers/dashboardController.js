const pool = require("../config/db");


const getDashboardStats = async (req, res, next) => {
    try {

        const books = await pool.query(
            `   SELECT 
                COUNT(*) AS total_books,
                SUM(quantity) AS total_copies,
                SUM(available_quantity) AS available_copies
            FROM books`
        );


        const borrowed = await pool.query(
            `
            SELECT COUNT(*) AS borrowed_books
            FROM borrow_records
            WHERE status = 'Borrowed'
            `
        );


        const members = await pool.query(
            `
            SELECT COUNT(*) AS total_members
            FROM members
            `
        );


        const categories = await pool.query(
            `
            SELECT COUNT(*) AS total_categories
            FROM categories
            `
        );


        const authors = await pool.query(
            `
            SELECT COUNT(*) AS total_authors
            FROM authors
            `
        );


       const dashboardData = {
    total_books: Number(books.rows[0].total_books),
    total_copies: Number(books.rows[0].total_copies),
    available_copies: Number(books.rows[0].available_copies),

    borrowed_books: Number(borrowed.rows[0].borrowed_books),

    total_members: Number(members.rows[0].total_members),

    total_categories: Number(categories.rows[0].total_categories),

    total_authors: Number(authors.rows[0].total_authors)
};


res.success(dashboardData);


    } catch(error) {
        next(error);
    }
};


module.exports = {
    getDashboardStats
};