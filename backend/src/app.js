import express from "express";
import cors from "cors";

import router from "./routes/index.js";
import AppError from "./middlewares/app.error.js";
import errorMiddleware from "./middlewares/error.middleware.js";

const app = express();

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

app.use(errorMiddleware);

export default app;