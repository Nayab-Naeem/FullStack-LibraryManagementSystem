const express = require("express");

const router = express.Router();
const validateBook = require("../middleware/validateBook");
const { 
    getAllBooks,
    getBookById,
    addBook,
    updateBook,
    deleteBook
} = require("../controllers/bookController");


router.get("/", getAllBooks);

router.get("/:id", getBookById);

router.post("/", validateBook, addBook);

router.put("/:id", validateBook, updateBook);

router.delete("/:id", deleteBook);


module.exports = router;