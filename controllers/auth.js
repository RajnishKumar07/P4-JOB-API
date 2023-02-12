const User = require("../models/user");

const { StatusCodes } = require("http-status-codes");
const jwt = require("jsonwebtoken");

const { UnauthenticatedError, BadRequestError } = require("../errors");
const { use } = require("../routes/auth");

const login = async (req, resp) => {
  const { email, password } = req.body;
  if (!email || !password) {
    throw new BadRequestError("Please provide email and password");
  }
  const user = await User.findOne({ email });
  if (!user) {
    throw new UnauthenticatedError("Invalid Credentials");
  }
  const isPasswordCorrect = await user.comparePassword(password);
  if (!isPasswordCorrect) {
    throw new UnauthenticatedError("Invalid Credentials");
  }
  const token = user.createJWT();
  resp.status(StatusCodes.OK).json({ user: { name: user.name }, token });
};

const register = async (req, resp) => {
  const user = await User.create({ ...req.body });
  const token = user.createJWT();
  resp.status(StatusCodes.CREATED).json({ user: { name: user.name }, token });
};

module.exports = {
  login,
  register,
};
