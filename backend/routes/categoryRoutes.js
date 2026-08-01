const express = require("express");
const router = express.Router();
const verifyToken = require("../middleware/authMiddleware");

const {
    getAllCategories,
    getCategoryById,
    addCategory,
    updateCategory,
    deleteCategory
} = require("../controllers/categoryController");

router.get("/",verifyToken, getAllCategories);
router.get("/:id",verifyToken, getCategoryById);
router.post("/",verifyToken, addCategory);
router.put("/:id",verifyToken, updateCategory);
router.delete("/:id",verifyToken, deleteCategory);

module.exports = router;