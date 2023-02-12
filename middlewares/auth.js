const jwt = require("jsonwebtoken");
const { UnauthenticatedError } = require("../errors");

const authenticationMiddleware = (req, resp, next) => {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    throw new UnauthenticatedError("No Token Provided");
  }
  const token = authHeader.split(" ")[1];
  try {
    const decode = jwt.verify(token, process.env.JWT_SECRET);
    const { userId, name } = decode;
    req.user = { userId, name };
    next();
  } catch (error) {
    throw new UnauthenticatedError("Not authorized to access this route");
  }
};

module.exports = authenticationMiddleware;
