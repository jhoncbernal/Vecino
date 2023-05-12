function handleMongoError(error) {
  let statusCode = 500;
  let message = "Internal Server Error";
  let details = {};

  if (error.name === "ValidationError") {
    // Validation errors
    statusCode = 400;
    message = "Validation Error";
    details = error.errors;
  } else if (error.name === "CastError") {
    // Invalid ID errors
    statusCode = 400;
    message = "Invalid ID";
    details = { id: error.value };
  } else if (error.code === 11000) {
    // Duplicate key errors
    statusCode = 409;
    message = "Duplicate Key";
    details = error.keyValue;
  } else if (error.name === "MongoError") {
    // Mongo errors
    statusCode = 400;
    message = "Mongo Error";
    details = error;
  } else if (
    error?.message?.includes("Not found") ||
    error?.message?.includes("Invalid")
  ) {
    // Mongo errors
    statusCode = 404;
    message = error.message;
    details = error;
  }

  return {
    statusCode,
    message,
    details,
  };
}

export { handleMongoError };
