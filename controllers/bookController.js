const books = require("../models/bookModel");


const getAllBooks = (req,res)=>{
    res.success(books);
};


const getBookById = (req, res) => {
    const bookId = Number(req.params.id);

    const book = books.find((book) => book.id === bookId);

    if (!book) {
       return res.status(404).json({
    success: false,
    message: "Book not found"
});
    }

   res.success(book);
};

const addBook = (req, res) => {
    const newBook = {
        id: books.length + 1,
        title: req.body.title,
        author: req.body.author
    };

    books.push(newBook);

   res.status(201).json({
    success:true,
    message:"Book added successfully",
    data:newBook
});

};

const updateBook = (req, res) => {
    const bookId = Number(req.params.id);

    const book = books.find((book) => book.id === bookId);

    if (!book) {
        return res.status(404).json({
    success: false,
    message: "Book not found"
});
    }

    book.title = req.body.title;
    book.author = req.body.author;

   res.json({
    success: true,
    message: "Book updated successfully",
    data: book
});
};

const deleteBook = (req, res) => {
    const bookId = Number(req.params.id);

    const index = books.findIndex((book) => book.id === bookId);

   if (index === -1) {
    return res.status(404).json({
        success: false,
        message: "Book not found"
    });
}

    const deletedBook = books.splice(index, 1);

   res.json({
    success: true,
    message: "Book deleted successfully",
    data: deletedBook[0]
});
};

module.exports = {
    getAllBooks,
    getBookById,
    addBook,
    updateBook,
    deleteBook
};