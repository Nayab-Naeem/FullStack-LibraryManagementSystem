const express = require("express");
const router = express.Router();

const {
    getAllBorrowRecords,
    getBorrowRecordById,
    addBorrowRecord,
    updateBorrowRecord,
    deleteBorrowRecord
} = require("../controllers/borrowController");

router.get("/", getAllBorrowRecords);
router.get("/:id", getBorrowRecordById);
router.post("/", addBorrowRecord);
router.put("/:id", updateBorrowRecord);
router.delete("/:id", deleteBorrowRecord);

module.exports = router;