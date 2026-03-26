export const errorHandler = (err, req, res, next) => {
  console.error(err.stack);

  // Handle specific error types
  if (err.name === "ValidationError") {
    return res.status(400).json({
      error: "Validation Error",
      message: err.message,
      details: err.details,
    });
  }

  if (err.name === "UnauthorizedError") {
    return res.status(401).json({
      error: "Unauthorized",
      message: err.message,
    });
  }

  // Default error
  res.status(err.status || 500).json({
    error: err.name || "Internal Server Error",
    message: err.message || "Something went wrong",
    ...(process.env.NODE_ENV === "development" && { stack: err.stack }),
  });
};

// 404 handler for undefined routes
export const notFound = (req, res, next) => {
  res.status(404).json({
    error: "Not Found",
    message: `Route ${req.method} ${req.url} not found`,
  });
};
