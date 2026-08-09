require("dotenv").config();

const cors = require("cors");    //importing cor for permission bridge between React and Express

const pool = require("./config/db");

const express = require("express");

const app = express();


app.use(
  cors({
    origin: true,
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"]
  })
);

const PORT = process.env.PORT || 5000;


const apiResponse = require("./middleware/apiResponse");
const errorHandler = require("./middleware/errorHandler");
const bookRoutes = require("./routes/bookRoutes");
const authorRoutes = require("./routes/authorRoutes");
const categoryRoutes = require("./routes/categoryRoutes");
const memberRoutes = require("./routes/memberRoutes");
const borrowRoutes = require("./routes/borrowRoutes");
const dashboardRoutes = require("./routes/dashboardRoutes");
const authRoutes = require("./routes/authRoutes");
const verifyToken = require("./middleware/authMiddleware");

app.use(express.json());

app.use(apiResponse);


app.use("/books", verifyToken, bookRoutes);
app.use("/authors", verifyToken, authorRoutes);
app.use("/categories", categoryRoutes);
app.use("/members", verifyToken, memberRoutes);
app.use("/borrow-records", verifyToken, borrowRoutes);
app.use("/dashboard", dashboardRoutes);
app.use("/auth", authRoutes);

app.use(errorHandler);

//connecting database
pool.connect()
    .then(() => {
        console.log("✅ Connected to PostgreSQL");
    })
    .catch((err) => {
        console.error("❌ Database connection failed:", err.message);
    });


app.listen(PORT, "0.0.0.0", () => {
  console.log(`Server is running on port ${PORT}`);
});