const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const crypto = require("crypto");

const userSchema = new mongoose.Schema({
  userName: {
    type: String,
    required: [true, "Please your userName"],
    minlength: [3, "Please enter a name atleast 3 characters"],
    maxlength: [50, "Name can not big than 15 characters"],
  },
  firstName: {
    type: String,
    required: [true, "Please your firstName"],
    minlength: [3, "Please enter a name atleast 3 characters"],
    maxlength: [50, "Name can not big than 15 characters"],
  },
  lastName: {
    type: String,
    required: [true, "Please your lastName"],
    minlength: [3, "Please enter a name atleast 3 characters"],
    maxlength: [50, "Name can not big than 15 characters"],
  },
  born: {
    type: Date,
    required: [true, "Please your Born"],
    minlength: [3, "Please enter a name atleast 3 characters"],
    maxlength: [50, "Name can not big than 15 characters"],
  },
  email: {
    type: String,
    required: [true, "Please enter your email"],
    validate: [validator.isEmail, "Please enter a valid email"],
    unique: true,
  },
  password: {
    type: String,
    required: [true, "Please enter your password!"],
    minlength: [8, "Password should be greater than 8 characters"],
    select: false,
  },
  location: {
    type: String,
    required: [true, "Please your location"],
    minlength: [50, "Location should be greater than 50 characters"],
  },
  avatar: {
    public_id: {
      type: String,
      required: true,
    },
    url: {
      type: String,
      required: true,
    },
  },
  role: {
    type: String,
    default: "user",
  },
  createdAt: {
    type: Date,
    default: Date.now(),
  },
  resetPasswordToken: String,
  resetPasswordTime: Date,
});

// Hash password
userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    next();
  }
  this.password = await bcrypt.hash(this.password, 10);
});

// jwt token
userSchema.methods.getJwtToken = function () {
  return jwt.sign({ id: this._id }, process.env.JWT_SECRET_KEY, {
    expiresIn: process.env.JWT_EXPIRES,
  });
};

// compare password
userSchema.methods.comparePassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

// Forgot password
userSchema.methods.getResetToken = function () {
  // Generating token
  const resetToken = crypto.randomBytes(20).toString("hex");

  //    hashing and adding resetPasswordToken to userSchema
  this.resetPasswordToken = crypto
    .createHash("sha256")
    .update(resetToken)
    .digest("hex");

  this.resetPasswordTime = Date.now() + 15 * 60 * 1000;

  return resetToken;
};

module.exports = mongoose.model("User", userSchema);