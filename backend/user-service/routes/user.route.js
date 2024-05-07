const express = require("express");
const { registerUser, loginUser, logout, getUser, getAllUsers, loginStatus, updateUser, changePassword, forgotPassword, resetPassword} = require("../controller/user.controller");
const protect = require("../middleware/auth.middleware");
const router = express.Router();

router.post("/register", registerUser);
router.post("/login", loginUser);
router.get("/logout", logout);
router.get("/getuser", protect, getUser);
router.get("/loggedin", loginStatus);
router.get("/all", getAllUsers); // This will handle GET requests to /api/users/all
router.patch("/updateuser", protect, updateUser);
router.patch("/changepassword", protect, changePassword);
router.post("/forgotpassword", forgotPassword);
router.put("/resetpassword/:resetToken", resetPassword);

module.exports = router;
