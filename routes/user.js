const express = require("express");
const router = express.Router();
const User = require("../models/user");
const wrapAsync = require("../utils/wrapAsync");
const passport = require("passport");
const { saveRedirectUrl } = require("../middleware");
const {
  userSignUpPage,
  userLogInPage,
  signUpUser,
  logInUser,
  logOutUser,
} = require("../controller/user");

router.route("/signup").get(userSignUpPage).post(wrapAsync(signUpUser));

router
  .route("/login")
  .get(userLogInPage)
  .post(
    saveRedirectUrl,
    passport.authenticate("local", {
      failureRedirect: "/login",
      failureFlash: true,
    }),
    logInUser
  );

router.get("/logout", logOutUser);

module.exports = router;
