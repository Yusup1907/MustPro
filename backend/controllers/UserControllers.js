const User = require("../models/UserModels");
const ErrorHandler = require("../utils/ErrorHandler.js");
const catchAsyncErrors = require("../middleware/catchAsyncErrors");
const sendToken = require("../utils/jsonWebToken.js");
const crypto = require("crypto");
const sendMail = require("../utils/sendMail");

// Register User

exports.createUser = catchAsyncErrors(async (req, res, next) => {
  const { userName, firstName, lastName, born, email, password, location } = req.body;

  const user = await User.create({
    userName,
    firstName,
    lastName,
    born,
    email,
    password,
    location,
  });

  sendToken(user, 200, res);
});

// Login User

exports.loginUser = catchAsyncErrors(async (req, res, next) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return next(new ErrorHandler("Please enter your email & password", 400));
  }

  const user = await User.findOne({ email }).select("+password");
  if (!user) {
    return next(
      new ErrorHandler("User is not found with this email & password", 401)
    );
  }

  const hashPassword = await user.comparePassword(password);
  if (!hashPassword) {
    return next(
      new ErrorHandler("User is not found with this email & password", 401)
    );
  }

  sendToken(user, 200, res);
});

// Logout User

exports.logoutUser = catchAsyncErrors(async (req, res, next) => {
  res.cookie("token", null, {
    expires: new Date(Date.now()),
    httpOnly: true,
  });

  res.status(200).json({
    success: true,
    message: "Logout Success",
  });
});

// Forgot Password

exports.forgotUser = catchAsyncErrors(async (req, res, next) => {
  const user = await User.findOne({ email: req.body.email });

  if (!user) {
    return next(new ErrorHandler("User not Found with this email", 404));
  }

  // Get Reset Password Token

  const resetPasswordToken = user.getResetToken();

  await user.save({
    validateBeforeSave: false,
  });

  const resetPasswordUrl = `${req.protocol}://${req.get(
    "host"
  )}/password/reset/${resetPasswordToken}`;

  const message = `Your password reset token is :- /n/n ${resetPasswordUrl}`;

  try {
    await sendMail({
      email: user.email,
      subject: `Propertiku Password Recovery`,
      message,
    });

    res.status(200).json({
      success: true,
      message: `Email sent to ${user.email} succesfully`,
    });
  } catch (error) {
    user.resetPasswordToken = undefined;
    user.resetPasswordTime = undefined;

    await user.save({
      validateBeforeSave: false,
    });
    return next(new ErrorHandler(error.message));
  }
});

// Reset Password

exports.resetPassword = catchAsyncErrors(async (req, res, next) => {
  // Create Token hash

  const resetPasswordToken = crypto
    .createHash("sha256")
    .update(req.params.token)
    .digest("hex");

  const user = await User.findOne({
    resetPasswordToken,
    resetPasswordTime: { $gt: Date.now() },
  });

  if (!user) {
    return next(
      new ErrorHandler("Reset password url is invalid or has been expired", 400)
    );
  }

  if (req.body.password !== req.body.confirmPassword) {
    return next(
      new ErrorHandler("Password is not matched with new password", 400)
    );
  }

  user.password = req.body.password;

  user.resetPasswordToken = undefined;
  user.resetPasswordTime = undefined;

  await user.save();

  sendToken(user, 200, res);
});

// Get User Details

exports.userDetails = catchAsyncErrors(async (req, res, next) => {
  const user = await User.findById(req.user.id);

  res.status(200).json({
    success: true,
    user,
  });
});


// Update User Password

exports.updatePassword = catchAsyncErrors(async (req, res, next) => {
  const user = await User.findById(req.user.id).select("+password");

    const hashPassword = await user.comparePassword(req.body.oldPassword);

    if (!hashPassword) {
      return next(
        new ErrorHandler("Old Password is incorrect", 400)
      );
    };

    if(req.body.newPassword  !== req.body.confirmPassword){
        return next(
            new ErrorHandler("Password not matched with each other", 400)
          );
    }

    user.password = req.body.newPassword;

    await user.save();

    sendToken(user,200,res);
});


// Update User Profile

exports.updateProfile = catchAsyncErrors(async (req, res, next) => {
  const newUser = {
    userName: req.body.userName,
    email: req.body.email,
  }

  // We add claudinary letter then we are giving condition for the avatar
  const user = await User.findByIdAndUpdate(req.user.id, newUser, {
    new: true,
    runValidators: true,
    useFindAndModify: false,
  })

  res.status(200).json({
    success: true,
    user
  })
})

// Get All users ---Admin
exports.getAllUsers = catchAsyncErrors(async (req,res,next) =>{
  const users = await User.find();

  res.status(200).json({
      success: true,
      users,
  });
});

// Get Single User Details ---Admin
exports.getSingleUser = catchAsyncErrors(async (req,res,next) =>{
  const user = await User.findById(req.params.id);
 
  if(!user){
      return next(new ErrorHandler("User is not found with this id",400));
  }

  res.status(200).json({
      success: true,
      user,
  });
});

// Change user Role --Admin
exports.updateUserRole = catchAsyncErrors(async(req,res,next) =>{
  const newUserData = {
      userName: req.body.userName,
      email: req.body.email,
      role: req.body.role,
  };
  const user = await User.findByIdAndUpdate(req.params.id,newUserData, {
      new: true,
      runValidators: true,
      useFindAndModify: false,
  });

  res.status(200).json({
      success: true,
      user
  })
});

// Delete User ---Admin
exports.deleteUser = catchAsyncErrors(async(req,res,next) =>{

 const user = await User.findById(req.params.id);


  if(!user){
      return next(new ErrorHandler("User is not found with this id",400));
  }

  await user.remove();

  res.status(200).json({
      success: true,
      message:"User deleted successfully"
  })
});
