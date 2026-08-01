const express = require("express");
const router = express.Router();
const verifyToken = require("../middleware/authMiddleware");

const {
    getAllBorrowRecords,
    getBorrowRecordById,
    addBorrowRecord,
    updateBorrowRecord,
    deleteBorrowRecord
} = require("../controllers/borrowController");

router.get("/",verifyToken, getAllBorrowRecords);
router.get("/:id",verifyToken, getBorrowRecordById);
router.post("/",verifyToken, addBorrowRecord);
router.put("/:id",verifyToken, updateBorrowRecord);
router.delete("/:id",verifyToken, deleteBorrowRecord);

module.exports = router;