const Properti = require("../models/PropertiModels.js");
const ErrorHandler = require("../utils/ErrorHandler.js");
const catchAsyncErrors = require("../middleware/catchAsyncErrors");
const Features = require("../utils/Features");

// Create Properti

exports.createProperti = catchAsyncErrors(async (req, res, next) => {
  const properti = await Properti.create(req.body);

  res.status(201).json({
    success: true,
    properti,
  });
});

// get All Properti

exports.getAllProperti = catchAsyncErrors(async (req, res) => {
  const resultPerPage = 8;
  const propertiCount = await Properti.countDocuments();
  const feature = new Features(Properti.find(), req.query)
    .search()
    .filter()
    .pagination(resultPerPage);
  const properti = await feature.query;
  res.status(200).json({
    success: true,
    properti,
  });
});

exports.updateProperti = catchAsyncErrors(async (req, res, next) => {
  let properti = await Properti.findById(req.params.id);
  if (!properti) {
    return next(new ErrorHandler("Properti is not found with this id", 404));
  }

  properti = await Properti.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
    useUnified: false,
  });

  res.status(200).json({
    success: true,
    properti,
  });
});

// Delete Properti

exports.deleteProperti = catchAsyncErrors(async (req, res, next) => {
  const properti = await Properti.findById(req.params.id);

  if (!properti) {
    return next(new ErrorHandler("Properti is not found with this id", 404));
  }

  await properti.remove();

  res.status(200).json({
    success: true,
    message: "Properti deleted successfully",
  });
});

// Single Properti Details

exports.getSingleProperti = catchAsyncErrors(async (req, res, next) => {
  const properti = await Properti.findById(req.params.id);

  if (!properti) {
    return next(new ErrorHandler("Properti is not found with this id", 404));
  }
  res.status(200).json({
    success: true,
    properti,
    propertiCount
  });
});

//Create New Review or Update the Review

exports.createReview = catchAsyncErrors(async (req, res, next) => {
  const { rating, comment, propertiId } = req.body;

  const review = {
    user: req.user._id,
    name: req.user.name,
    rating: Number(rating),
    comment,
  };

  const properti = await Properti.findById(propertiId);

  const isReviewed = properti.reviews.find(
    (rev) => rev.user.toString() === req.user._id.toString()
  );

  if (isReviewed) {
    properti.reviews.forEach((rev) => {
      if (rev.user.toString() === req.user._id.toString())
        (rev.rating = rating), (rev.comment = comment);
    });
  } else {
    properti.reviews.push(review);
    properti.numOfReviews = properti.reviews.length;
  }

  let avg = 0;

  properti.reviews.forEach((rev) => {
    avg += rev.rating;
  });

  properti.ratings = avg / properti.reviews.length;

  await properti.save({ validateBeforeSave: false });

  res.status(200).json({
    success: true,
  });
});

// Get All reviews of a single properti
exports.getSingleReviews = catchAsyncErrors(async (req, res, next) => {
  const properti = await Properti.findById(req.query.id);

  if (!properti) {
    return next(new ErrorHandler("Properti is not found with this id", 404));
  }

  res.status(200).json({
    success: true,
    reviews: properti.reviews,
  });
});

// Delete Review --Admin
exports.deleteReview = catchAsyncErrors(async (req, res, next) => {
  const properti = await Properti.findById(req.query.propertiId);

  if (!properti) {
    return next(new ErrorHandler("Properti not found with this id", 404));
  }

  const reviews = properti.reviews.filter(
    (rev) => rev._id.toString() !== req.query.id.toString()
  );

  let avg = 0;

  reviews.forEach((rev) => {
    avg += rev.rating;
  });

  let ratings = 0;

  if (reviews.length === 0) {
    ratings = 0;
  } else {
    ratings = avg / reviews.length;
  }

  const numOfReviews = reviews.length;

  await Properti.findByIdAndUpdate(
    req.query.propertiId,
    {
      reviews,
      ratings,
      numOfReviews,
    },
    {
      new: true,
      runValidators: true,
      useFindAndModify: false,
    }
  );

  res.status(200).json({
    success: true,
  });
});

// 