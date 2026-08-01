const express = require("express");

const router = express.Router();
const validateBook = require("../middleware/validateBook");
const verifyToken = require("../middleware/authMiddleware");

const { 
    getAllBooks,
    getBookById,
    getBooksWithDetails,
    searchBooks,
    addBook,
    updateBook,
    deleteBook
} = require("../controllers/bookController");


router.get("/", verifyToken, getAllBooks);

router.get("/details",verifyToken, getBooksWithDetails);

router.get("/search", verifyToken, searchBooks);

router.get("/:id", verifyToken,  getBookById);

router.post("/", verifyToken, validateBook, addBook);

router.put("/:id", verifyToken, validateBook, updateBook);

router.delete("/:id", verifyToken, deleteBook);


module.exports = router;