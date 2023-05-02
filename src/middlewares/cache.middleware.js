// Import required modules
import mcache from "memory-cache";
import { CACHE_KEY } from "../config.js";

// Create cache middleware
const cacheMiddleware = (duration) => {
  return (req, res, next) => {
    const key = CACHE_KEY + req.originalUrl;
    const cacheBody = mcache.get(key);
    if (cacheBody) {
      return res.send(JSON.parse(cacheBody));
    } else {
      res.sendResponse = res.send;
      res.send = (body) => {
        mcache.put(key, body, duration * 1000);
        res.sendResponse(body);
      };
      next();
    }
  };
};

// Export cache middleware
export default cacheMiddleware;
