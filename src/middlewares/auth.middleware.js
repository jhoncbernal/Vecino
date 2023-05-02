import { verify } from "jsonwebtoken";
import { JWT_SECRET } from "../config/index.js";
export default function (req, res, next) {
  const token = req.headers["authorization"];
  if (!token) {
    const error = new Error();
    error.status = 401;
    error.message = "token must be sent";
    throw error;
  }
  verify(token, JWT_SECRET, function (err, decodedToken) {
    if (err) {
      const error = new Error();
      error.message = "validate token value";
      error.status = 401;
      throw error;
    }
    req.user = decodedToken.user;
    next();
  });
};
