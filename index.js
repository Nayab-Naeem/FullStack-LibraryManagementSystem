const express = require("express");

const app = express();

app.use(express.json());

const PORT = 5000;

const bookRoutes = require("./routes/bookRoutes");

app.use("/books", bookRoutes);


app.get("/", (req, res) => {
    res.json({
        message: "Welcome to Library Management API"
    });
});


app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});