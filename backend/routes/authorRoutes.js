const express = require("express");
const router = express.Router();
const verifyToken = require("../middleware/authMiddleware");
const {
    getAllAuthors,
    getAuthorById,
    addAuthor,
    updateAuthor,
    deleteAuthor
} = require("../controllers/authorController");

router.get("/",verifyToken, getAllAuthors);
router.get("/:id",verifyToken, getAuthorById);
router.post("/",verifyToken, addAuthor);
router.put("/:id",verifyToken, updateAuthor);
router.delete("/:id",verifyToken, deleteAuthor);

module.exports = router;