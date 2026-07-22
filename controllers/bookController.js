const pool = require("../config/db");


// GET ALL BOOKS
const getAllBooks = async (req, res, next) => {
    try {

        const result = await pool.query(
            "SELECT * FROM books"
        );

        res.success(result.rows);

    } catch (error) {
        next(error);
    }
};

// GET BOOK BY ID
const getBookById = async (req, res, next) => {
    try {
        const { id } = req.params;

        const result = await pool.query(
            "SELECT * FROM books WHERE id = $1",
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

// GET BOOK DETAILS WITH AUTHOR AND CATEGORY
const getBookDetails = async (req, res, next) => {
    try {
        const result = await pool.query(
            `SELECT 
                books.id,
                books.title,
                books.isbn,
                books.published_year,
               authors.name AS author,
                categories.name AS category
                 FROM books
            JOIN authors
            ON books.author_id = authors.id
            JOIN categories
            ON books.category_id = categories.id `

        );

        res.success(result.rows);
    } catch(error) {

        next(error);
    }

};

const getBooksWithDetails = async (req, res, next) => {
    try {

        const result = await pool.query(
            `
            SELECT
                books.id,
                books.title,
                books.isbn,
                books.published_year,

                authors.name AS author,

                categories.name AS category,

                books.quantity,
                books.available_quantity

            FROM books

            JOIN authors
            ON books.author_id = authors.id

            JOIN categories
            ON books.category_id = categories.id

            ORDER BY books.id;
            `
        );

        res.success(result.rows);

    } catch (error) {
        next(error);
    }
};

const searchBooks = async (req, res, next) => {
    try {

        const { title, author, category } = req.query;

       const result = await pool.query(
`
SELECT
    books.id,
    books.title,
    books.isbn,
    books.published_year,
    authors.name AS author,
    categories.name AS category,
    books.quantity,
    books.available_quantity

FROM books

JOIN authors
ON books.author_id = authors.id

JOIN categories
ON books.category_id = categories.id

WHERE
( $1 = '' OR books.title ILIKE '%' || $1 || '%')
AND
( $2 = '' OR authors.name ILIKE '%' || $2 || '%' )
AND
( $3 = '' OR categories.name ILIKE '%' || $3 || '%')

ORDER BY books.id;
`,
[
    title || "",
    author || "",
    category || ""
]
);
        res.success(result.rows);

    } catch(error) {
        next(error);
    }
};

// ADD BOOK
const addBook = async (req, res, next) => {

    try {

        const {title,isbn,published_year,author_id,category_id} = req.body;



        const result = await pool.query(

            `INSERT INTO books
            (
                title,
                isbn,
                published_year,
                author_id,
                category_id
            )
            VALUES($1,$2,$3,$4,$5)
            RETURNING *`,
            [title,isbn,published_year,author_id,category_id]
        );

        res.status(201).json({

            success:true,

            message:"Book added successfully",

            data:result.rows[0]

        });
    } catch(error) {

        next(error);
    }
};

// UPDATE BOOK
const updateBook = async (req, res, next) => {

    try {

        const { id } = req.params;


        const {title,isbn, published_year,author_id, category_id} = req.body;

        const result = await pool.query(

            `UPDATE books
            SET
            title=$1,
            isbn=$2,
            published_year=$3,
            author_id=$4,
            category_id=$5
            WHERE id=$6
            RETURNING *`,

            [title,isbn,published_year,author_id,category_id,id ]

        );
        if(result.rows.length===0){

            return res.status(404).json({

                success:false,

                message:"Book not found"

            });
        }
        res.json({

            success:true,

            message:"Book updated successfully",

            data:result.rows[0]

        });

    } catch(error){

        next(error);
    }
};




// DELETE BOOK
const deleteBook = async (req,res,next)=>{

    try{
        const {id}=req.params;
        const result = await pool.query(
            "DELETE FROM books WHERE id=$1 RETURNING *",
            [id]
        );
        if(result.rows.length===0){

            return res.status(404).json({

                success:false,

                message:"Book not found"

            });
        }
        res.json({

            success:true,

            message:"Book deleted successfully",

            data:result.rows[0]

        });
    }catch(error){

        next(error);
    }
};


module.exports = {getAllBooks,getBookById,getBookDetails,getBooksWithDetails,searchBooks ,addBook,updateBook,deleteBook};