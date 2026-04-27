import AppError from "./app.error.js";

export const authorizeRoles = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user?.role)) {
      throw new AppError("Forbidden", 403);
    }
    next();
  };
};
