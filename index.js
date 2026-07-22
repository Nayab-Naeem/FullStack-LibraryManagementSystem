require("dotenv").config();
const pool = require("./config/db");

const express = require("express");

const app = express();

const PORT = process.env.PORT || 5000;


const apiResponse = require("./middleware/apiResponse");
const errorHandler = require("./middleware/errorHandler");
const bookRoutes = require("./routes/bookRoutes");
const authorRoutes = require("./routes/authorRoutes");
const categoryRoutes = require("./routes/categoryRoutes");
const memberRoutes = require("./routes/memberRoutes");
const borrowRoutes = require("./routes/borrowRoutes");

app.use(express.json());

app.use(apiResponse);


app.use("/books", bookRoutes);
app.use("/authors", authorRoutes);
app.use("/categories", categoryRoutes);
app.use("/members", memberRoutes);
app.use("/borrow-records", borrowRoutes);

app.use(errorHandler);

//connecting database
pool.connect()
    .then(() => {
        console.log("✅ Connected to PostgreSQL");
    })
    .catch((err) => {
        console.error("❌ Database connection failed:", err.message);
    });


app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});