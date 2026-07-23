const validateBook = (req, res, next) => {

    const { title, author } = req.body;

    if (!title || !author) {
        return res.status(400).json({
            message: "Title and author are required"
        });
    }

    next();
};

module.exports = validateBook;