const ErrorMiddleware = (req, res, next) => {
  const originalSend = res.send;

const wrapResponse = (data, statusCode) => {
  const success = statusCode >= 200 && statusCode < 300;

  const wrappedResponse = {
    success: success,
    message: success ? "Success" : "An error occurred",
  };

  if (success) {
    if (typeof data === "string") {
      try {
        wrappedResponse.data = JSON.parse(data);
      } catch (error) {
        wrappedResponse.data = data;
      }
    } else if (data?.data && data?.meta) {
      // If data has a 'data' and 'meta' property, extract both separately
      wrappedResponse.data = data.data;
      wrappedResponse.meta = data.meta;
    } else {
      wrappedResponse.data = data;
    }
  } else {
    wrappedResponse.error = {
      code: statusCode,
      message: data && data.message ? data.message : "An error occurred",
    };
  }

  return wrappedResponse;
};



  res.send = (data) => {
    res.setHeader("Content-Type", "application/json");
    try {
      const wrappedResponse = wrapResponse(data, res.statusCode);
      originalSend.call(res, JSON.stringify(wrappedResponse));
    } catch (error) {
      console.error("Error in ErrorMiddleware:", error);
      originalSend.call(
        res,
        JSON.stringify({
          message: "An error occurred while processing the request",
        })
      );
    }
  };

  next();
};

export default ErrorMiddleware;
