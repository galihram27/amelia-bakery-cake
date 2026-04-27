const errorHandler =  (err, req, res, next) => {
  console.error(err);

  let statusCode = err.statusCode || 500;
  let message = err.message || "Internal Server Error";

  // JWT errors
  if (err.name === "TokenExpiredError") {
    statusCode = 401;
    message = "Token expired";
  }

  if (err.name === "JsonWebTokenError") {
    statusCode = 401;
    message = "Token tidak valid";
  }

  res.status(statusCode).json({
    status: statusCode.toString().startsWith("4") ? "fail" : "error",
    message,
  });
};

export default errorHandler;