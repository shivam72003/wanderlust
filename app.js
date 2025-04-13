if (process.env.NODE_ENV != "production") {
  require("dotenv").config();
}

const express = require("express");
const app = express();
const mongoose = require("mongoose");
const path = require("path");
const methodOverride = require("method-override");
const ejsMate = require("ejs-mate");
const ExpressErr = require("./utils/ExpressErr.js");
const expressSession = require("express-session");
const mongoStoreSession = require("mongo-store");

const listingRouter = require("./routes/listing.js");
const reviewRouter = require("./routes/review.js");
const userRouter = require("./routes/user.js");

const session = require("express-session");
const flash = require("connect-flash");

const passport = require("passport");
const LocalStategy = require("passport-local");
const user = require("./models/user.js");

//////sessions

const store = mongoStoreSession({
  mongoUrl: dburl,
  crypto: {
    secret: process.env.SECRET,
  },
  touchAfter: 24 * 3600,
});

store.on("error", () => {
  console.log(`error in session store ${err}`);
});

sessionOptions = {
  store,
  secret: process.env.SECRET,
  resave: false,
  saveUninitailized: true,
  cookie: {
    expires: Date.now() + 60 * 60 * 24 * 7 * 1000,
    maxAge: 7 * 24 * 60 * 60 * 1000,
  },
};

///////mongo

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride("_method"));
app.use(express.static(path.join(__dirname, "/public")));
app.engine("ejs", ejsMate);

const dburl = process.env.MONGOALTLAS;

main()
  .then(() => {
    console.log("connected to DB");
  })
  .catch((err) => {
    console.log(err);
  });

async function main() {
  await mongoose.connect(dburl);
}

app.use(session(sessionOptions));
app.use(flash());

app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStategy(user.authenticate()));
passport.serializeUser(user.serializeUser());
passport.deserializeUser(user.deserializeUser());

// app.get("/", (req, res) => {
//   res.send("this is working");
// });

/////// flash
app.use((req, res, next) => {
  res.locals.success = req.flash("success");
  res.locals.error = req.flash("error");
  res.locals.currUser = req.user;
  next();
});

app.use("/listings", listingRouter);
app.use("/listings/:id/reviews", reviewRouter);
app.use("/", userRouter);

////////// servers

app.all("*", (req, res, next) => {
  next(new ExpressErr(404, "Page Not Found"));
});

app.use((err, req, res, next) => {
  let { status = 500, message = "something went wrong" } = err;
  res.status(status).render("./listing/error.ejs", { message });
});

////////
app.listen(8080, () => {
  console.log("app is listening on port : 8080");
});
