const express = require("express");
const app = express();
const router = require("./routes/product.route");
const cors = require("cors");
const AppError = require('./middlewares/app.error');
const errorHandler = require("./middlewares/error.handler");
/*
const helmet = require('helmet');

app.use(helmet());
*/

app.use(cors());
app.use(express.json());
app.use("/api", router);

app.use((req, res, next) => {
    next(new AppError('Route tidak ditemukan', 404));
});

app.use(errorHandler);

module.exports = app;
