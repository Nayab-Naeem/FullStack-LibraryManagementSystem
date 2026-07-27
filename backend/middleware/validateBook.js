const validateBook = (req, res, next) => {
  const {
    title,
    isbn,
    published_year,
    author_id,
    category_id,
    quantity,
  } = req.body;

  if (
    !title ||
    !isbn ||
    !published_year ||
    !author_id ||
    !category_id
  ) {
    return res.status(400).json({
      success: false,
      message: "All required fields must be provided.",
    });
  }

  const currentYear = new Date().getFullYear();

  if (
    published_year < 1000 ||
    published_year > currentYear
  ) {
    return res.status(400).json({
      success: false,
      message: `Published year must be between 1000 and ${currentYear}.`,
    });
  }

  if (quantity !== undefined && quantity < 1) {
    return res.status(400).json({
      success: false,
      message: "Quantity must be at least 1.",
    });
  }

  next();
};

module.exports = validateBook;