require("dotenv").config();
const pool = require("./config/db");

const express = require("express");

const app = express();

const PORT = process.env.PORT || 5000;


const apiResponse = require("./middleware/apiResponse");
const errorHandler = require("./middleware/errorHandler");
const bookRoutes = require("./routes/bookRoutes");

app.use(express.json());

app.use(apiResponse);


app.use("/books", bookRoutes);


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