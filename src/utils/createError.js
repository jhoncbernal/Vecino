function createError(status, message) {
  const error = new Error();
  error.status = status;
  error.message = message;
  throw error;
}

module.exports = createError;