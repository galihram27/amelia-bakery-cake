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

// STATIC FILES (UPLOAD)
app.use('/uploads', express.static('uploads'));

// ROUTER API
app.use('/api', router);

// 404 HANDLER
app.use((req, res, next) => {
  next(new AppError('Route tidak ditemukan', 404));
});

// ERROR HANDLER
app.use(errorMiddleware);

export default app;