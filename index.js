require("dotenv").config();

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


app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});