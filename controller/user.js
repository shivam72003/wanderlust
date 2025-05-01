const User = require("../models/user");

module.exports.userSignUpPage = (req, res) => {
  res.render("./users/signup.ejs");
};

module.exports.userLogInPage = (req, res) => {
  res.render("./users/login.ejs");
};

module.exports.signUpUser = async (req, res) => {
  try {
    let { username, email, password } = req.body;
    const newuser = new User({
      username: username,
      email: email,
    });
    let registeredUser = await User.register(newuser, password);
    console.log(registeredUser);
    req.login(registeredUser, (err) => {
      if (err) {
        next();
      }
      req.flash("success", "Welcome To Wanderlust!");
      res.redirect("/listings");
    });
  } catch (e) {
    req.flash("error", e.message);
    res.redirect("/signup");
  }
};

module.exports.logInUser = async (req, res) => {
  req.flash("success", "Welcome Back To Wonderlust!");
  let redirectUrl = res.locals.redirectUrl || "/listings";
  res.redirect(redirectUrl);
};

module.exports.logOutUser = (req, res, next) => {
  req.logout((err) => {
    if (err) {
      return next(err);
    }
    req.flash("success", "Logged Out!");
    res.redirect("/listings");
  });
};
