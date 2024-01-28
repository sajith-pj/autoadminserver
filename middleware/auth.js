const jwt = require("jsonwebtoken");

const verifyToken = (req, res, next) => {
  // Get the token from the request headers or query parameters
  const token = req.headers.authorization.split(" ")[1];
  console.log(token);
  // Check if a token is provided
  if (!token) {
    return res.status(401).json({ error: "Unauthorized: No token provided" });
  }

  // Verify the token
  jwt.verify(token, process.env.JWT_SECRET_KEY, (err, decoded) => {
    if (err) {
      return res.status(401).json({ error: "Unauthorized: Invalid token" });
    }

    // Attach the decoded payload to the request object for further use
    req.user = decoded;
    next();
  });
};

module.exports = verifyToken;
