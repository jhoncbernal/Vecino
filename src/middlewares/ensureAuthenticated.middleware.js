export default function (req, res, next) {
  if (req.isAuthenticated()) {
    // If the user is authenticated, continue with the next middleware or handler
    return next();
  }

  // If the user is not authenticated, send an error response
  res.status(401).json({ error: "Authentication required" });
};
