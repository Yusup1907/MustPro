const express = require("express");
const {
  createUser,
  loginUser,
  logoutUser,
  forgotUser,
  resetPassword,
  userDetails,
  updatePassword,
  updateProfile,
  getSingleUser,
  getAllUsers,
  updateUserRole,
  deleteUser,
} = require("../controllers/UserControllers");
const { isAuthUser, authorizeRoles } = require("../middleware/auth");
const router = express.Router();

router.route("/register").post(createUser);
router.route("/login").post(loginUser);
router.route("/logout").get(logoutUser);
router.route("/password/forgot").post(forgotUser);
router.route("/password/reset/:token").put(resetPassword);
router.route("/me").get(isAuthUser, userDetails);
router.route("/me/update").put(isAuthUser, updatePassword);
router.route("/me/update/info").put(isAuthUser, updateProfile);
router
  .route("/admin/users")
  .get(isAuthUser, authorizeRoles("admin", "agen"), getAllUsers);
router
  .route("/admin/user/:id")
  .get(isAuthUser, authorizeRoles("admin", "agen"), getSingleUser)
  .put(isAuthUser, authorizeRoles("admin", "agen"), updateUserRole)
  .delete(isAuthUser, authorizeRoles("admin", "agen"), deleteUser)

module.exports = router;
