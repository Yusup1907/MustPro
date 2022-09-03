const Indekos = require("../models/IndekosModels");
const ErrorHandler = require("../utils/ErrorHandler.js");
const catchAsyncErrors = require("../middleware/catchAsyncErrors");
const Features = require("../utils/Features");

// Create Properti

exports.createIndekos = catchAsyncErrors(async (req, res, next) => {
  const indekos = await Indekos.create(req.body);

  res.status(201).json({
    success: true,
    indekos,
  });
});

// get All Properti

exports.getAllIndekos = catchAsyncErrors(async (req, res) => {
  const resultPerPage = 8;
  const indekosCount = await Indekos.countDocuments();
  const feature = new Features(Indekos.find(), req.query)
    .search()
    .filter()
    .pagination(resultPerPage);
  const indekos = await feature.query;
  res.status(200).json({
    success: true,
    indekos,
  });
});

exports.updateIndekos = catchAsyncErrors(async (req, res, next) => {
  let indekos = await Indekos.findById(req.params.id);
  if (!indekos) {
    return next(new ErrorHandler("Indekos is not found with this id", 404));
  }

  indekos = await Indekos.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
    useUnified: false,
  });

  res.status(200).json({
    success: true,
    indekos,
  });
});

// Delete Properti

exports.deleteIndekos = catchAsyncErrors(async (req, res, next) => {
  const indekos = await Indekos.findById(req.params.id);

  if (!indekos) {
    return next(new ErrorHandler("Indekos is not found with this id", 404));
  }

  await indekos.remove();

  res.status(200).json({
    success: true,
    message: "indekos deleted successfully",
  });
});

// Single Properti Details

exports.getSingleIndekos = catchAsyncErrors(async (req, res, next) => {
  const indekos = await Indekos.findById(req.params.id);

  if (!indekos) {
    return next(new ErrorHandler("Indekos is not found with this id", 404));
  }
  res.status(200).json({
    success: true,
    indekos,
    indekosCount
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

  const indekos = await Indekos.findById(propertiId);

  const isReviewed = indekos.reviews.find(
    (rev) => rev.user.toString() === req.user._id.toString()
  );

  if (isReviewed) {
    indekos.reviews.forEach((rev) => {
      if (rev.user.toString() === req.user._id.toString())
        (rev.rating = rating), (rev.comment = comment);
    });
  } else {
    indekos.reviews.push(review);
    indekos.numOfReviews = indekos.reviews.length;
  }

  let avg = 0;

  indekos.reviews.forEach((rev) => {
    avg += rev.rating;
  });

  indekos.ratings = avg / indekos.reviews.length;

  await indekos.save({ validateBeforeSave: false });

  res.status(200).json({
    success: true,
  });
});

// Get All reviews of a single properti
exports.getSingleReviews = catchAsyncErrors(async (req, res, next) => {
  const indekos = await Indekos.findById(req.query.id);

  if (!indekos) {
    return next(new ErrorHandler("Indekos is not found with this id", 404));
  }

  res.status(200).json({
    success: true,
    reviews: indekos.reviews,
  });
});

// Delete Review --Admin
exports.deleteReview = catchAsyncErrors(async (req, res, next) => {
  const indekos = await Indekos.findById(req.query.propertiId);

  if (!indekos) {
    return next(new ErrorHandler("Indekos not found with this id", 404));
  }

  const reviews = indekos.reviews.filter(
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

  await Indekos.findByIdAndUpdate(
    req.query.indekosId,
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