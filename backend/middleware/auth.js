const ErrorHandler = require("../utils/ErrorHandler");
const catchAsyncErrors = require("./catchAsyncErrors");
const jwt = require("jsonwebtoken");
const User = require("../models/UserModels");

exports.isAuthUser = catchAsyncErrors(async (req, res, next) => {
  const { token } = req.cookies;

  if (!token) {
    return next(new ErrorHandler("Please login four access", 401));
  }

  const decodedData = jwt.verify(token, process.env.JWT_SECRET_KEY);

  req.user = await User.findById(decodedData.id);

  next();
});

// Make Roles Admmin our Agen

exports.authorizeRoles = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      return next(new ErrorHandler(`${req.user.role} your can't access`));
    }

    next();
  };
};
