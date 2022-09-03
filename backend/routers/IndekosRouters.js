const express = require("express");
const {
  getAllIndekos,
  createIndekos,
  updateIndekos,
  deleteIndekos,
  getSingleIndekos,
  createReview,
  getSingleReviews,
  deleteReview,
} = require("../controllers/IndekosControllers");
const { isAuthUser, authorizeRoles } = require("../middleware/auth");
const router = express.Router();

router.route("/indekos").get(getAllIndekos);
router
  .route("/indekos/new")
  .post(isAuthUser, authorizeRoles("admin", "agen"), createIndekos);
router
  .route("/indekos/:id")
  .put(isAuthUser, authorizeRoles("admin", "agen"), updateIndekos)
  .delete(isAuthUser, authorizeRoles("admin", "agen"), deleteIndekos)
  .get(getSingleIndekos);

router.route("/indekos/review").post(isAuthUser, createReview);
router
  .route("/reviews")
  .get(getSingleReviews)
  .delete(isAuthUser, authorizeRoles("admin", "agen"), deleteReview);

module.exports = router;
