const express = require("express");
const {
  createProperti,
  updateProperti,
  deleteProperti,
  getSingleProperti,
  getAllProperti,
  createReview,
  getSingleReviews,
  deleteReview,
} = require("../controllers/PropertiControllers");
const { isAuthUser, authorizeRoles } = require("../middleware/auth");
const router = express.Router();

router.route("/properti").get(getAllProperti);
router
  .route("/properti/new")
  .post(isAuthUser, authorizeRoles("admin", "agen"), createProperti);
router
  .route("/properti/:id")
  .put(isAuthUser, authorizeRoles("admin", "agen"), updateProperti)
  .delete(isAuthUser, authorizeRoles("admin", "agen"), deleteProperti)
  .get(getSingleProperti);

router.route("/properti/review").post(isAuthUser, createReview);
router
  .route("/reviews")
  .get(getSingleReviews)
  .delete(isAuthUser, authorizeRoles("admin", "agen"), deleteReview);

module.exports = router;
