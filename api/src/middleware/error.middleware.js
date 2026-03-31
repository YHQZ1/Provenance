export const errorHandler = (err, req, res, next) => {
  console.error(err.stack);

  const isDev = process.env.NODE_ENV === "development";

  if (err.name === "ValidationError") {
    return res.status(400).json({
      error: "Validation Error",
      message: err.message,
      details: err.errors || err.details || null,
    });
  }

  if (err.name === "UnauthorizedError") {
    return res.status(401).json({
      error: "Unauthorized",
      message: err.message,
    });
  }

  if (err.name === "JsonWebTokenError") {
    return res.status(401).json({
      error: "Invalid Token",
      message: err.message,
    });
  }

  if (err.name === "TokenExpiredError") {
    return res.status(401).json({
      error: "Token Expired",
      message: err.message,
    });
  }

  res.status(err.status || 500).json({
    error: err.name || "Internal Server Error",
    message: isDev ? err.message : "Something went wrong",
    ...(isDev && { stack: err.stack }),
  });
};

export const notFound = (req, res, next) => {
  const err = new Error(`Route ${req.method} ${req.url} not found`);
  err.status = 404;
  next(err);
};
